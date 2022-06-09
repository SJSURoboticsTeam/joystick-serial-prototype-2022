#include <SoftwareSerial.h>

#define rxPin 0
#define txPin 1
#define ledPin 10

SoftwareSerial inputSerial =  SoftwareSerial(rxPin, txPin);

void setup() {
  pinMode(rxPin, INPUT);
  pinMode(txPin, OUTPUT);
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
  inputSerial.begin(9600);
  inputSerial.listen();
}

void loop() {
  auto userInput = inputSerial.read();
  Serial.println("Arduino Serial Print...");
  if (userInput == '0') { 
    digitalWrite(ledPin, LOW);
    delay(1000);
  }
  digitalWrite(ledPin, HIGH);
  delay(500);
}