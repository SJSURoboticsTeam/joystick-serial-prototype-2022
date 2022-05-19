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
  char userInput = inputSerial.read();
//  Serial.print("User inputed: ");
//  Serial.println(c);
  if (userInput == '0') { 
    digitalWrite(ledPin, LOW);
    delay(1000);
  }
  digitalWrite(ledPin, HIGH);
  delay(500);
}