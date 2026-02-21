/*
  Robot Car Code with State Machine:
  1. SEEKS an object and stops.
  2. WAITS for an IR "move" command.
  3. Switches to OBSTACLE AVOIDANCE mode.
  4. After avoiding, returns to SEEKING mode.
*/

// --- Include necessary libraries ---
#include <Servo.h>
#include <IRremote.hpp> 

// Servo Motor for Ultrasonic Sensor
Servo Servo1;

// Ultrasonic Sensor Pins
int Echo_Pin = A0;  // ECHO pin to A0
int Trig_Pin = A1;  // TRIG pin to A1

// IR Receiver Pin
#define IR_RECEIVER_PIN 12

// L298N Motor Driver Pins
#define Lpwm_pin 5    // ENA: Left motor speed control (PWM)
#define Rpwm_pin 6    // ENB: Right motor speed control (PWM)
int pinLB = 2;      // IN1: Left motor backward
int pinLF = 4;      // IN2: Left motor forward
int pinRB = 7;      // IN3: Right motor backward
int pinRF = 8;      // IN4: Right motor forward

// --- IR Remote Definitions ---
#define IR_STOP_COMMAND 0x45
#define IR_MOVE_COMMAND 0x40

// --- Constants ---
#define SEEK_DISTANCE 15      // Distance in cm to stop in front of an object
#define AVOIDANCE_DISTANCE 20 // Distance in cm to trigger obstacle avoidance
#define FORWARD_SPEED 100     // Default forward speed (0-255)
#define TURN_SPEED 150        // Default turn speed (0-255)

// === State Machine Definition ===
enum RobotState {
  SEEKING,   // Looking for an object
  LOCKED_ON, // Found an object, waiting for command
  AVOIDING,  // Moving and avoiding obstacles
  MANUAL_STOP // Stopped by IR remote
};

// Set the initial state of the robot
RobotState currentState = SEEKING;

// --- Setup Function ---
void setup() {
  Serial.begin(9600);

  //Activate IR Sensor
  IrReceiver.begin(IR_RECEIVER_PIN, ENABLE_LED_FEEDBACK);

  //Setup Servo
  Servo1.attach(A2);
  Servo1.write(90);

  //Ultrasonic Distance Sensor Pins
  pinMode(Echo_Pin, INPUT);
  pinMode(Trig_Pin, OUTPUT);

  // Motor Pins
  pinMode(pinLB, OUTPUT);
  pinMode(pinLF, OUTPUT);
  pinMode(pinRB, OUTPUT);
  pinMode(pinRF, OUTPUT);

  // Motor PWM Pins (for speed control)
  pinMode(Lpwm_pin, OUTPUT);
  pinMode(Rpwm_pin, OUTPUT);
  Serial.println("Robot Initialized. Starting in SEEKING mode.");
}

// --- Main Loop ---
void loop() {
  handleIRCommands();

  switch (currentState) {
    case SEEKING:
      stateSeek();
      break;
    case LOCKED_ON:
      // Waiting for command
      break;
    case AVOIDING:
      stateAvoid();
      break;
    case MANUAL_STOP:
      // Waiting for command
      break;
  }
}


// === State Handling Functions ===

/*
stateSeek():
- seek mode looks for an obstacle
- searching with a fixed range, currently set to 15
- it stays in place while doing the scan momentarily (very briefly)
- if no blocking object, move forward

*/
void stateSeek() {
  float distance = checkdistance();
  Serial.print("Seeking... Distance: ");
  Serial.println(distance);

  if (distance < SEEK_DISTANCE && distance > 0) {
    stopp();
    currentState = LOCKED_ON;
    Serial.println("Object found! State -> LOCKED_ON. Waiting for command.");
  } else {
    go_forward(FORWARD_SPEED);
  }
}

/*
stateAvoid(): 
Whenever an object is detected
- Look both sides and find free distance
- If more free space on left side of robot, then move left
- Else if more free space of right side of robot, then move right
*/
void stateAvoid() {
  float Front_Distance = checkdistance();
  Serial.print("Avoiding... Distance: ");
  Serial.println(Front_Distance);

  if (Front_Distance < AVOIDANCE_DISTANCE && Front_Distance > 0) {
    stopp();
    delay(500);

    Servo1.write(180); // Look left
    delay(500);
    float Left_Distance = checkdistance();
    delay(100);

    Servo1.write(0); // Look right
    delay(500);
    float Right_Distance = checkdistance();
    delay(100);

    Servo1.write(90); // Return to center
    delay(200);

    if (Left_Distance > Right_Distance) {
      rotate_left(TURN_SPEED);
      delay(400);
    } else {
      rotate_right(TURN_SPEED);
      delay(400);
    }
  } else {
    // ******************************************************
    // *** THE ONLY CHANGE IS HERE ***
    // If the path is clear, obstacle is avoided. Return to SEEKING mode.
    Serial.println("Path clear! State -> SEEKING.");
    currentState = SEEKING;
    // ******************************************************
  }
}

// --- Helper Functions ---

/*
handleIRCommands() controls functionality for IR Remote
This code sets the "global" defined variable, currentState, an enumerated value.
Based on what value is set, the corresponding functionality is determined within the loop function.
*/
void handleIRCommands() {
  if (IrReceiver.decode()) {
    if (IrReceiver.decodedIRData.command == IR_STOP_COMMAND) {
      currentState = MANUAL_STOP;
      stopp();
      Serial.println("IR command received! State -> MANUAL_STOP.");
    }
    else if (IrReceiver.decodedIRData.command == IR_MOVE_COMMAND) {
      if (currentState == LOCKED_ON || currentState == MANUAL_STOP) {
        currentState = AVOIDING;
        Serial.println("IR command received! State -> AVOIDING.");
      }
    }
    delay(100);
    IrReceiver.resume();
  }
}

/*
checkDistance() returns the distance read in by the ultrasonic sensor.
Trig_Pin: refers to the pin that sends the ultrasonic wave.
Echo_Pin: refers to the pin that reads the ultrasonic wave that bounces back from an object.
*/
float checkdistance() {
  //Send ultrasonic wave signal
  digitalWrite(Trig_Pin, LOW);
  delayMicroseconds(2);
  digitalWrite(Trig_Pin, HIGH);
  delayMicroseconds(10);
  digitalWrite(Trig_Pin, LOW);

  //Read in ultrasonic wave signal
  float distance = pulseIn(Echo_Pin, HIGH) / 58.00;
  delay(10);
  return distance;
}

// --- Motor Control Functions (Unchanged) ---

/*
Move the robot forward
For left motor:
- Turn forward direction signal from motor controller off
- Turn backward direction signal from motor controller on

For right motor:
- Turn forward direction signal from motor controller off
- Turn backward direction signal from motor controller on

* The reason it is like this the motors purchase for this robot spin in opposite direction in relation to motor drivers input signals
*/
void go_forward(unsigned char speed_val) {
  digitalWrite(pinRB, HIGH);
  digitalWrite(pinRF, LOW);
  digitalWrite(pinLB, HIGH);
  digitalWrite(pinLF, LOW);
  analogWrite(Lpwm_pin, speed_val);
  analogWrite(Rpwm_pin, speed_val);
}

/*
Move the robot backwards
For left motor:
- Turn forward direction signal from motor controller on
- Turn backward direction signal from motor controller off

For right motor:
- Turn forward direction signal from motor controller on
- Turn backward direction signal from motor controller off

* The reason it is like this the motors purchase for this robot spin in opposite direction in relation to motor drivers input signals
*/
void go_backward(unsigned char speed_val) {
  digitalWrite(pinRB, LOW);
  digitalWrite(pinRF, HIGH);
  digitalWrite(pinLB, LOW);
  digitalWrite(pinLF, HIGH);
  analogWrite(Lpwm_pin, speed_val);
  analogWrite(Rpwm_pin, speed_val);
}

/*
Rotate the robot to the left.
For right motor of robot:
- Turn off the signal moving robot to the forward direction
- Turn on the signal moving the robot in reverse direction

For left motor of robot:
- Turn off the signal moving robot to the reverse direction
- Turn on the signal moving robot in the forward direction

* The way it works with our robot: left motor goes backward, right motor goes forward;
* but the pins are opposite/switched so left front signal is set to ON, right back signal set to ON
*/
void rotate_left(unsigned char speed_val) {
  digitalWrite(pinRB, HIGH);
  digitalWrite(pinRF, LOW);
  digitalWrite(pinLB, LOW);
  digitalWrite(pinLF, HIGH);
  analogWrite(Lpwm_pin, speed_val);
  analogWrite(Rpwm_pin, speed_val);
}

/*
Rotate the robot to the right.
For right motor of robot:
- Turn off the signal moving robot to the reverse direction
- Turn on the signal moving the robot in forward direction

For left motor of robot:
- Turn off the signal moving robot to the forward direction
- Turn on the signal moving robot in the reverse direction

* The way it works with our robot: left motor goes forward, right motor goes backward;
* but the pins are opposite/switched so left back signal is set to ON, right forward signal set to ON
*/
void rotate_right(unsigned char speed_val) {
  digitalWrite(pinRB, LOW);
  digitalWrite(pinRF, HIGH);
  digitalWrite(pinLB, HIGH);
  digitalWrite(pinLF, LOW);
  analogWrite(Lpwm_pin, speed_val);
  analogWrite(Rpwm_pin, speed_val);
}

// Turn off all the robots motors
void stopp() {
  digitalWrite(pinLF, LOW);
  digitalWrite(pinLB, LOW);
  digitalWrite(pinRF, LOW);
  digitalWrite(pinRB, LOW);
}
