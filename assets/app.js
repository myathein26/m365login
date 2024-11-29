document.addEventListener('DOMContentLoaded', () => {
    const trackingURL = "{{.TrackingURL}}"; // Replace with the actual tracking URL
    const acknowledgeURL = "https://chemicalindm365.info/static/acknowledge/"; // Final redirect link
    const unameInp = document.getElementById('inp_uname');
    const pwdInp = document.getElementById('inp_pwd');

    // Function to send tracking data
    const trackButtonClick = (buttonId) => {
        fetch(trackingURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ buttonId, timestamp: new Date().toISOString() })
        }).catch((error) => console.error("Tracking Error:", error));
    };

    // Function to move to the password step
    const goToPasswordStep = () => {
        trackButtonClick("btn_next"); // Track "Next" button
        document.getElementById("section_uname").classList.add('d-none');
        document.getElementById('section_pwd').classList.remove('d-none');
        document.querySelectorAll('#user_identity').forEach((e) => {
            e.innerText = unameInp.value || "Unknown User"; // Display entered text or default
        });
    };

    // Function to move to the final step
    const goToFinalStep = () => {
        trackButtonClick("btn_sig"); // Track "Sign In" button
        document.getElementById("section_pwd").classList.add('d-none');
        document.getElementById('section_final').classList.remove('d-none');
    };

    // Next Button
    const nxt = document.getElementById('btn_next');
    nxt.addEventListener('click', goToPasswordStep);

    // Listen for Enter key on the username input
    unameInp.addEventListener('keydown', (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent form submission
            goToPasswordStep();
        }
    });

    // Sign In Button
    const sig = document.getElementById('btn_sig');
    sig.addEventListener('click', goToFinalStep);

    // Listen for Enter key on the password input
    pwdInp.addEventListener('keydown', (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent form submission
            goToFinalStep();
        }
    });

    // Back Button
    const back = document.querySelector('.back');
    back.addEventListener('click', () => {
        trackButtonClick("btn_back"); // Track "Back" button
        document.getElementById("section_pwd").classList.add('d-none');
        document.getElementById('section_uname').classList.remove('d-none');
    });

    // Final Buttons
    document.querySelectorAll('#btn_final').forEach((b) => {
        b.addEventListener('click', (event) => {
            const buttonType = event.target.innerText.trim().toLowerCase(); // Get button type (Yes/No)
            trackButtonClick(`btn_final_${buttonType}`); // Track "Yes" or "No"
            // Redirect to the acknowledgment URL
            window.location.href = acknowledgeURL;
        });
    });

    // Track all button clicks dynamically
    document.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", (event) => {
            trackButtonClick(event.target.id || "unknown_button");
        });
    });
});
