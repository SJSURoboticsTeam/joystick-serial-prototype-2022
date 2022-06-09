# Rover Raspberry Pi Video Streaming

## Setup
1. Firstly make sure you've got a functioning Pi camera module. detected=1  
    ```
    vcgencmd get_camera
    ```

2. Install necessary packages (Only needed for JSMPG streaming)
    ```
    sudo apt-get install python3-ws4py 
    ```

## Usage
### Low Bandwidth Preffered Streaming Method - JSMPG
  ```
  python3 jsmpg-streaming.py  
  ```
  then navigate to
  ```
  http://raspberrypi:8082/jsmpg.js
  ``` 
  ---
### Basic Streaming Application - MJPG
  ```
  python3 mjpg-streaming.py
  ```
  then navigate to
  ```
  http://raspberrypi:8000/stream.mjpg
  ```  