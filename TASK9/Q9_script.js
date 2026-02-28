$(document).ready(function () {
    // JSON Structure
    const formJSON = {
        title: "Registration Form",
        fields: [
            { type: "text", name: "name", label: "Full Name", required: true },
            { type: "email", name: "email", label: "Email", required: true },
            { type: "password", name: "password", label: "Password", required: true },
            {
                type: "select",
                name: "country",
                label: "Country",
                required: true,
                options: ["Select", "USA", "India", "Other"],
            },
        ],
    };

    const form = $("<form id='dynamicForm'></form>");

    // Build form dynamically
    formJSON.fields.forEach((field) => {
        let group = $("<div class='form-group'></div>");
        group.append("<label>" + field.label + "</label>");

        if (field.type === "select") {
            let select = $("<select name='" + field.name + "'></select>");
            field.options.forEach((option) => {
                select.append("<option value='" + option + "'>" + option + "</option>");
            });
            group.append(select);
        } else {
            group.append("<input type='" + field.type + "' name='" + field.name + "' />");
        }

        group.append("<div class='error'></div>");
        form.append(group);
    });

    // Additional Conditional Fields
    form.append(`
        <div class='form-group hidden' id='stateField'>
            <label>State</label>
            <select name='state'>
                <option value=''>Select State</option>
                <option value='California'>California</option>
                <option value='Texas'>Texas</option>
            </select>
            <div class='error'></div>
        </div>

        <div class='form-group hidden' id='studentField'>
            <label>Are you a Student?</label>
            <select name='student'>
                <option value=''>Select</option>
                <option value='yes'>Yes</option>
                <option value='no'>No</option>
            </select>
        </div>

        <div class='form-group hidden' id='collegeField'>
            <label>College Name</label>
            <input type='text' name='college'>
            <div class='error'></div>
        </div>
    `);

    form.append("<button type='submit'>Submit</button>");
    $("#form-container").append(form);

    // Interactivity: Country Selection
    $("select[name='country']").change(function () {
        let value = $(this).val();
        $("#stateField").addClass("hidden");
        $("#studentField").addClass("hidden");

        if (value === "USA") {
            $("#stateField").removeClass("hidden");
        }
        if (value === "India") {
            $("#studentField").removeClass("hidden");
        }
    });

    // Interactivity: Student Selection
    $(document).on("change", "select[name='student']", function () {
        if ($(this).val() === "yes") {
            $("#collegeField").removeClass("hidden");
        } else {
            $("#collegeField").addClass("hidden");
        }
    });

    // Form Validation
    $("#dynamicForm").submit(function (e) {
        e.preventDefault();
        let isValid = true;
        $(".error").text("");

        // Name validation
        let name = $("input[name='name']").val().trim();
        if (name === "") {
            $("input[name='name']").next(".error").text("Name is required");
            isValid = false;
        }

        // Email validation
        let email = $("input[name='email']").val().trim();
        let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!email.match(emailPattern)) {
            $("input[name='email']").next(".error").text("Valid email required");
            isValid = false;
        }

        // Password validation
        let password = $("input[name='password']").val().trim();
        if (password.length < 6) {
            $("input[name='password']").next(".error").text("Minimum 6 characters required");
            isValid = false;
        }

        // USA state validation
        if ($("select[name='country']").val() === "USA") {
            if ($("select[name='state']").val() === "") {
                $("select[name='state']").next(".error").text("Select a state");
                isValid = false;
            }
        }

        // Conditional validation: Student
        if ($("select[name='student']").val() === "yes") {
            let college = $("input[name='college']").val().trim();
            if (college === "") {
                $("input[name='college']").next(".error").text("College name required");
                isValid = false;
            }
        }

        if (isValid) {
            alert("Form submitted successfully!");
        }
    });
});
