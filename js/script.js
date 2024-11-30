
    let header = document.querySelector('header');
    let menu = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.navbar');
     
     
    window.addEventListener('scroll', () => {
        header.classList.toggle('shadow', window.scrollY > 0);
    });
     
    menu.onclick = () => {
        navbar.classList.toggle('active');
    }
    window.onscroll = () => {
        navbar.classList.remove('active');
    }
     
    // Dark Mode
    let darkmode = document.querySelector('#darkmode');
     
    darkmode.onclick = () => {
        if(darkmode.classList.contains('bx-moon')){
            darkmode.classList.replace('bx-moon','bx-sun');
            document.body.classList.add('active');
        }else{
            darkmode.classList.replace('bx-sun','bx-moon');
            document.body.classList.remove('active');
        }
    }


// email api
    document.getElementById("contactForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();
        const formMessage = document.getElementById("formMessage");

        if (!name || !email || !message) {
            formMessage.textContent = "All fields are required!";
            formMessage.style.display = "block";
            return;
        }

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            formMessage.textContent = "Please enter a valid email address!";
            formMessage.style.display = "block";
            return;
        }

        // Sending form data to the backend API
        fetch("http://localhost:3000/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message }),
        })
            .then((response) => {
                if (response.ok) {
                    alert("Your message has been sent!");
                    document.getElementById("contactForm").reset();
                    formMessage.style.display = "none";
                } else {
                    formMessage.textContent = "Failed to send email. Please try again.";
                    formMessage.style.display = "block";
                }
            })
            .catch((error) => {
                formMessage.textContent = "An error occurred. Please try again later.";
                formMessage.style.display = "block";
                console.error("Error:", error);
            });
    });
