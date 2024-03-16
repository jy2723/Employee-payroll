$(document).ready(function() {
    $("#submit").click(function() {
        var name = $("#name").val();
        if (name.length < 3) {
            alert("Name must be at least 3 characters long.");
            return;
        }
        if ($("input[name='gender']:checked").length === 0) {
            alert("Please select gender.");
            return;
        }
        if ($("#salary").val() === "Select") {
            alert("Please select salary.");
            return;
        }
        if ($("#date").val() === "") {
            alert("Please select start date.");
            return;
        }

        alert("Form submitted successfully!");
    });
});

// Function to retrieve form data and create an object
// function getFormData() {
//     const name = document.getElementById("name").value;
//     let profile = "";
//     const profileRadios = document.querySelectorAll('input[name="profile"]');
//     profileRadios.forEach(radio => {
//         if (radio.checked) {
//             profile = radio.nextElementSibling.getAttribute("alt");
//         }
//     });
//     const gender = document.querySelector('input[name="gender"]:checked').value;
//     const departments = [];
//     const deptCheckboxes = document.querySelectorAll('input[name^="dept"]');
//     deptCheckboxes.forEach(checkbox => {
//         if (checkbox.checked) {
//             departments.push(checkbox.nextSibling.textContent.trim());
//         }
//     });
//     const salary = document.getElementById("salary").value;
//     const startDate = document.getElementById("date").value;
//     const notes = document.getElementById("notes").value;

//     // Create and return the object
//     const formData = {
//         name: name,
//         profile: profile,
//         gender: gender,
//         departments: departments,
//         salary: salary,
//         startDate: startDate,
//         notes: notes
//     };

    
//     return formData;
// }

// // Function to print object to console
// function printObject(obj) {
//     console.log(obj);
// }


// // Get form data when submit button is clicked
// document.getElementById("submit").addEventListener("click", function() {
//     const formData = getFormData();
//     printObject(formData);
// });


$('#submit').on('click', function () {
    var dataArray = [];
    var name = $('#name').val();
    var selectedProfile = $('input[name="profile"]:checked').val();
    var sal = $('#salary').val();
        

    var checkedBoxes = $('input[name="dept"]:checked');
    checkedBoxes.each(function () {
        dataArray.push($(this).attr('id'));
    });

    var gender = $('input[name="gender"]:checked').val();
    var dates = $('#date').val();
    var notesVal = $('#notes').val();

    
    var result = {
        name:name,
        profile:selectedProfile,
        salary:sal,
        department:dataArray,
        gender:gender,
        date:dates,
        notes:notesVal

    }

    var editDeleteButtons = '<td><button class="edit-btn">EDIT</button>|<button class="delete-btn">DELETE</button></td>';
    result.editDeleteButtons = editDeleteButtons;

    $.ajax({
        type:'POST',
        url:'http://localhost:3000/user',
        data:JSON.stringify(result),
        contentType: 'application/json'
    });


    console.log(result);
});


