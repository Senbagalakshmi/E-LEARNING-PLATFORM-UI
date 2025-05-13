// ------------------ User Registration ------------------
function register() {
  const username = document.getElementById("regUsername").value;
  const password = document.getElementById("regPassword").value;
  if (username && password) {
    localStorage.setItem("user", JSON.stringify({ username, password }));
    alert("Registration successful! Now login.");
    window.location.href = "login.html";
  } else {
    alert("Please fill out all fields.");
  }
}

// ------------------ Login ------------------
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (storedUser && storedUser.username === username && storedUser.password === password) {
    localStorage.setItem("currentUser", username);
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid credentials");
  }
}

// ------------------ Dashboard ------------------
document.addEventListener("DOMContentLoaded", () => {
  const currentUser = localStorage.getItem("currentUser");
  const userNameEl = document.getElementById("userName");
  if (userNameEl && currentUser) userNameEl.textContent = currentUser;

  const toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.onclick = () => {
      document.body.classList.toggle("dark");
    };
  }
  
  function displayCourses(list = courses) {
    const courseList = document.getElementById("courseList");
    if (!courseList) return;
    courseList.innerHTML = "";
    list.forEach(course => {
      const div = document.createElement("div");
      div.className = "course-card";
      div.innerHTML = `
        <h3>${course.title}</h3>
        <p>${course.desc}</p>
        <a href="video.html?title=${encodeURIComponent(course.title)}&file=${encodeURIComponent(course.file)}">Watch Video</a>
      `;
      courseList.appendChild(div);
    });
  }
  
  function addCourse() {
    const title = document.getElementById("courseTitle").value.trim();
    const desc = document.getElementById("courseDesc").value.trim();
    const file = document.getElementById("courseFile").value.trim();
  
    if (title && desc && file) {
      const newCourse = { title, desc, file };
      courses.push(newCourse);
      localStorage.setItem("courses", JSON.stringify(courses));
      displayCourses();
      document.getElementById("courseTitle").value = "";
      document.getElementById("courseDesc").value = "";
      document.getElementById("courseFile").value = "";
      alert("Course added successfully!");
    } else {
      alert("Please fill all fields.");
    }
  }
  

  // Setup Course List
  const courseList = document.getElementById("courseList");
  if (courseList) {
    const courses = [
      { title: "HTML Basics", desc: "Learn the structure of webpages", file: "html.mp4.mp4"},
      { title: "CSS Styling", desc: "Style beautiful interfaces", file: "css.mp4" },
      { title: "JavaScript Intro", desc: "Add interactivity", file: "javascript.mp4" },
      {title: "python Intro", desc: "Backend", file: "python.mp4" }
    ];
    localStorage.setItem("courses", JSON.stringify(courses));
    displayCourses(courses);

    const searchInput = document.getElementById("search");
    if (searchInput) {
      searchInput.addEventListener("input", e => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = courses.filter(c => c.title.toLowerCase().includes(searchTerm));
        displayCourses(filtered);
      });
    }
  }

  // Setup Video
  const videoTitle = document.getElementById("videoTitle");
  const courseVideo = document.getElementById("courseVideo");
  if (videoTitle && courseVideo) {
    const params = new URLSearchParams(location.search);
    const title = params.get("title");
    const file = params.get("file");
    if (title && file) {
      videoTitle.textContent = title;
      courseVideo.src = `assets/videos/${file}`;
    }
  }

  // Setup Progress Chart
  const chartCanvas = document.getElementById("progressChart");
  if (chartCanvas) {
    new Chart(chartCanvas, {
      type: "bar",
      data: {
        labels: ["HTML", "CSS", "JavaScript","python"],
        datasets: [{
          label: "Progress",
          data: [90, 60, 40],
          backgroundColor: ["#f44336", "#2196f3", "#4caf50"]
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true, max: 100 }
        }
      }
    });
  }
});

function displayCourses(courses) {
  const courseList = document.getElementById("courseList");
  courseList.innerHTML = "";
  courses.forEach(course => {
    const div = document.createElement("div");
    div.className = "course-card";
    div.innerHTML = `
      <h3>${course.title}</h3>
      <p>${course.desc}</p>
      <a href="video.html?title=${encodeURIComponent(course.title)}&file=${encodeURIComponent(course.file)}">Watch Video</a>
    `;
    courseList.appendChild(div);
  });
}
