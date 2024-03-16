document.addEventListener('DOMContentLoaded', () => {
    const userData = document.getElementById('userData');
    const editForm = document.getElementById('editForm');

    function Delete(userId) {
        fetch(`http://localhost:3000/user/${userId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
            const row = document.getElementById(`user-${userId}`);
            if (row) {
                row.remove();
                alert("deleted succesfully")
            }
        })
        
        .catch(error => console.error('Error deleting user:', error));
    }
    function Edit(userId) {
        // Fetch user details based on userId and populate the edit form
        fetch(`http://localhost:3000/user/${userId}`)
            .then(response => response.json())
            .then(user => {
                // Populate the edit form with user details
                document.getElementById('editName').value = user.name;
                document.getElementById('editSalary').value = user.salary;
                document.getElementById('editGender').value = user.gender;
                document.getElementById('editDepartment').value = user.department;
                document.getElementById('editDate').value = user.date;
                document.getElementById('editNotes').value = user.notes;

                // Show the edit form
                editForm.style.display = 'block';
            })
            .catch(error => console.error('Error fetching user details:', error));
    }

    fetch('http://localhost:3000/user')
        .then(response => response.json())
        .then(data => {
            data.forEach(user => {
                const row = document.createElement('tr');
                row.id = `user-${user.id}`;
                row.innerHTML = `
                    <!-- User details -->
                    <td><img src="${user.profile}" alt="Profile" width="40" style="clip-path: circle();"></td>
                    <td>${user.name}</td>
                    <td>${user.salary}</td>
                    <td>${user.gender}</td>
                    <td>${user.department}</td>
                    <td>${user.date}</td>
                    <td>${user.notes}</td>
                    <td>
                        <button class="edit-btn" data-user-id="${user.id}">EDIT</button>
                        <button class="delete-btn" data-user-id="${user.id}">DELETE</button>
                    </td>
                `;
                userData.appendChild(row);

                const editButton = row.querySelector('.edit-btn');
                editButton.addEventListener('click', () => {
                    const userId = editButton.getAttribute('data-user-id');
                    Edit(userId);
                });

                const deleteButton = row.querySelector('.delete-btn');
                deleteButton.addEventListener('click', () => {
                    const userId = deleteButton.getAttribute('data-user-id');
                    Delete(userId);
                });
            });
        })
        .catch(error => console.error('Error fetching data:', error));

    // Event listener for save changes button in edit form
    document.getElementById('saveChangesBtn').addEventListener('click', () => {
        // Handle form submission to save changes
        // Example: Collect form data and send it to the server to update user details
        // Reset form and hide it after submission
        editForm.reset();
        editForm.style.display = 'none';
    });
});

