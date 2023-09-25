document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const searchForm = document.querySelector("#searchForm");
  const searchInput = document.getElementById("search");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    try {
      const formData = new FormData(this);
      const reviewData = {};
      formData.forEach(function (value, key) {
        reviewData[key] = value;
      });
      console.log(JSON.stringify(reviewData));
      const response = await fetch("/api/add-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });
      const responseData = await response.json();
      if (responseData.message === "success") {
        swal
          .fire({
            title: "Your Attendance has been submitted successfully.",
            icon: "success",
            timer: 2000,
            buttons: false,
          })
          .then(function () {
            window.location.href = window.location.href;
          });
      } else {
        Swal.fire({
          icon: "info",
          title: "Error while saving data",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

  searchForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const companyName = searchInput.value;
    if (companyName) {
      try {
        const response = await fetch(
          `/api/get-review?companyName=${companyName}`
        );
        const companyDetail = await response.json();
        console.log(companyDetail);
        if (companyDetail.message === "success") {
          const reviewsContainer = document.querySelector("#reviewsContainer");
          const reviewsCompany = document.querySelector("#reviewsCompany");
          reviewsContainer.innerHTML = "";
          reviewsCompany.innerHTML = "";
          let totalReviews = 0;
          let countReviews = 0;
          let company_name;
          // Iterate for getting each review
          companyDetail.review.forEach((review, index) => {
            const reviewElement = document.createElement("div");
            reviewElement.classList.add("review");
            totalReviews = totalReviews + review.ratings;
            countReviews++;
            company_name = review.company_name;
            // Populate review details
            reviewElement.innerHTML = `
                <h4>Review ${index + 1}</h4>
                <p>Pros: ${review.pros}</p>
                <p>Cons: ${review.cons}</p>
                <p>Company Ratings: ${review.ratings}</p>
              `;
            reviewsContainer.appendChild(reviewElement);
          });
          const reviewRatioElement = document.createElement("div");
          reviewRatioElement.classList.add("review-ratio");
          ratioReview = totalReviews / countReviews;
          reviewRatioElement.innerHTML = `<h2>Company Name : ${company_name}</h2>
                                            <h2>Company Review : ${ratioReview}</h2>`;
          reviewsCompany.appendChild(reviewRatioElement);
        } else if (companyDetail.message === "No data found") {
          console.log("No data found");
        }
      } catch (e) {
        console.error("error getting");
      }
    } else {
      Swal.fire({
        icon: "info",
        title: "Please enter a company name",
      });
    }
  });
});
