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