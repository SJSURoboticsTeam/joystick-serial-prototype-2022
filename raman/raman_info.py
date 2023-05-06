from pywinauto import Application, Desktop
import time

def start_raman():
    try:
        raman = Application(backend="uia").connect(title = "C13560 Operation Software")
        raman.kill()
    except:
        pass
    raman = Application(backend="uia").start("C:\Program Files\HAMAMATSU Photonics\C13560\C13560_OperationSoftware\C13560_OperationSoftware.exe")

    password = raman.C13560OperationSoftware.child_window(auto_id="textBox1", control_type="Edit")
    password.wait("exists enabled visible ready")
    password.wrapper_object().type_keys("123")
    raman.C13560OperationSoftware.child_window(title="OK", auto_id="button1", control_type="Button").wrapper_object().click()

    return raman

def collect_data(raman):
    laser = raman.C13560OperationSoftware.child_window(title="Laser Emission", control_type="Button").wrapper_object()
    laser.click()

    start_measure = raman.C13560OperationSoftware.child_window(title="Start measure", control_type="Button")
    start_measure.wait("exists enabled visible ready")
    start_measure.wrapper_object().click()

    csv_window = raman.C13560OperationSoftware.child_window(title="Save CSV", auto_id="CsvSaveForm", control_type="Window")
    csv_window.wait("exists enabled visible ready")
    csv_window.child_window(title="OK", auto_id="buttonSave", control_type="Button").wrapper_object().click()

    save_window = raman.C13560OperationSoftware.child_window(title="Save As", control_type="Window")
    save_window.wait("exists enabled visible ready")
    save_window.child_window(title="Save", auto_id="1", control_type="Button").wrapper_object().click()

    raman.C13560OperationSoftware.capture_as_image().save('image.png')

    # raman.C13560OperationSoftware.print_control_identifiers()
    
    
collect_data(start_raman())