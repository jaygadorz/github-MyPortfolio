document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio loaded 🚀");

  // Initialize Vanta background
  VANTA.NET({
    el: "body",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x149a4a,
    backgroundColor: 0xffffff,
    points: 4.00,
    maxDistance: 20.00,
    spacing: 15.00
  });

  // Project data with gallery images and features
  const projects = {
    1: {
      title: "Project and Workflow Management",
      year: "2026",
      image: "assets/images/dashboard-1.png",
      tech: ["SQL", "Power Apps", "Power BI", "Dataverse"],
      description: "An integrated project and workflow management system that drives Continuous Improvement delivery by centralizing project tracking, savings, resources, timelines, and team governance in one real-time platform.",
      gallery: [
        "assets/images/PM/PM-ProjectDTL.png",
        "assets/images/PM/PM-RunningTaskTimer.png",
        "assets/images/PM/PM-ProjectPhase.png"
      ],
      features: [
        {
          title: "Home Dashboard",
          description: "Central hub displaying all active projects, timelines, and key metrics at a glance."
        },
        {
          title: "Project Tracking",
          description: "Real-time tracking of project status, resource allocation, and milestone progress."
        },
        {
          title: "Team Governance",
          description: "Centralized team management with role-based access and collaborative workflows."
        }
      ],
      github: "https://github.com/jaygadorz",
      live: null
    },
    2: {
      title: "Centralized Approval Platform",
      year: "2026",
      image: "assets/images/dashboard-2.png",
      tech: ["Power Automate", "SQL", "Power BI"],
      description: "An integrated case management and approval platform designed for the Medical Customer Service to submit customer requests for account review.",
      gallery: [
        "assets/images/GRT/GRT-Home2.png",
        "assets/images/GRT/GRT-ManageCase.png",
        "assets/images/GRT/GRT-Dashboard.png"
      ],
      features: [
        {
          title: "Case Submission",
          description: "Streamlined form for submitting customer account review requests with required documentation."
        },
        {
          title: "Approval Workflow",
          description: "Tiered approval process based on dollar thresholds, routing to appropriate decision makers."
        },
        {
          title: "Real-time Tracking",
          description: "Monitor case status (In Review, Approved, Rejected) with Outlook and in-app notifications."
        }
      ],
      github: "https://github.com/jaygadorz",
      live: null
    },
    3: {
      title: "Global Finance Executive Dashboard",
      year: "2026",
      image: "assets/images/dashboard-3.png",
      tech: ["SQL", "Distributed Systems", "Power Apps", "HTML", "ChartJS"],
      description: "This dashboard serves as a centralized hub for all KPIs of the Global Finance Service Center.",
      gallery: [
        "assets/images/CT/CT-2ndPage.png",
        "assets/images/CT/CT-HomeFilters.png",
        "assets/images/CT/CT-2ndPage-RootCause.png"
      ],
      features: [
        {
          title: "KPI Dashboard",
          description: "Interactive card-based visualization of all key performance indicators with historical trends."
        },
        {
          title: "Collaborative Workspace",
          description: "Document root causes, define action plans, and provide metric-level comments for accountability."
        },
        {
          title: "Performance Analytics",
          description: "Deep-dive analytics with drill-down capabilities for trend analysis and forecasting."
        }
      ],
      github: "https://github.com/jaygadorz",
      live: null
    }
  };

  // Modal elements - DECLARE THESE FIRST
  const modal = document.getElementById("project-modal");
  const modalClose = document.querySelector(".modal-close");
  const viewProjectButtons = document.querySelectorAll(".view-project");

  console.log("View Project Buttons found:", viewProjectButtons.length);
  console.log("Modal element:", modal);
  console.log("Modal close button:", modalClose);

  // Open modal
  viewProjectButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("View Details clicked!");
      
      const card = btn.closest(".card");
      const projectId = card.dataset.projectId;
      
      console.log("Project ID:", projectId);
      
      const project = projects[projectId];
      
      if (!project) {
        console.error("Project not found:", projectId);
        return;
      }

      // Populate modal title, meta, description
      document.getElementById("modal-title").textContent = project.title;
      document.getElementById("modal-year").textContent = project.year;
      document.getElementById("modal-description").textContent = project.description;

      // Tech pills
      const techContainer = document.getElementById("modal-tech");
      techContainer.innerHTML = project.tech
        .map(t => `<span class="tech">${t}</span>`)
        .join("");

      // Gallery Setup
      const mainImage = document.getElementById("gallery-main-image");
      const thumbnailsContainer = document.getElementById("gallery-thumbnails-container");
      
      mainImage.src = project.gallery[0];
      mainImage.alt = project.title;
      
      // Create thumbnails
      thumbnailsContainer.innerHTML = project.gallery
        .map((img, index) => `
          <div class="thumbnail ${index === 0 ? 'active' : ''}" data-image="${img}" data-index="${index}">
            <img src="${img}" alt="Gallery image ${index + 1}">
          </div>
        `)
        .join("");

      // Gallery thumbnail click handler
      const thumbnails = document.querySelectorAll(".thumbnail");
      thumbnails.forEach(thumb => {
        thumb.addEventListener("click", () => {
          mainImage.src = thumb.dataset.image;
          thumbnails.forEach(t => t.classList.remove("active"));
          thumb.classList.add("active");
        });
      });

      // Features Section
      const featuresContainer = document.getElementById("modal-features");
      featuresContainer.innerHTML = project.features
        .map(feature => `
          <div class="feature-item">
            <div class="feature-title">${feature.title}</div>
            <p class="feature-description">${feature.description}</p>
          </div>
        `)
        .join("");

      // Links
      const githubLink = document.getElementById("modal-github");
      const liveLink = document.getElementById("modal-live");

      if (project.github) {
        githubLink.href = project.github;
        githubLink.style.display = "inline-flex";
      } else {
        githubLink.style.display = "none";
      }

      if (project.live) {
        liveLink.href = project.live;
        liveLink.style.display = "inline-flex";
      } else {
        liveLink.style.display = "none";
      }

      // Show modal
      console.log("Opening modal...");
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  // Close modal
  modalClose.addEventListener("click", () => {
    console.log("Closing modal...");
    modal.classList.remove("active");
    document.body.style.overflow = "";
  });

  // Close on background click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      console.log("Closing modal on background click...");
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      console.log("Closing modal on Escape key...");
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
});