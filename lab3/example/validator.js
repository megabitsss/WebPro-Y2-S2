function validateForm() {

    let fname = document.getElementById("FirstName").value;
    let lname = document.getElementById("LastName").value;
    let addr = document.getElementById("Address").value;
    let country = document.getElementById("Country").value;

    if (fname.length < 3 ) {
        alert("Firstname must be filled out and at least 3 characters");
        return false;
    }
    if (lname.length < 2 ) {
        alert("Lastname must be filled out and at least 2 characters");
        return false;
    }
    if (addr.length < 10 ) {
        alert("Address must be filled out and at least 10 characters");
        return false;
    }
    if (country =="00" ) {
        alert("Country must be selected");
        return false;
    }
}

/**
     - การตรวจสอบความยาวของตัวอักษร
     let str = new String( "This is string" );
     document.write("str.length is:" + str.length);
     // str.length is: 14
     - การหาตำแหน่งข้อความในชุดตัวอักษร
     let str = "Hello world, welcome to the universe.";
     let n = str.indexOf("welcome"); 
     // n = 13
*/