 const allCourses = [
    // Web Development (15 courses)
    {
      id: 1,
      title: "React Masterclass",
      tutor: "Alex Johnson",
      hours: 24,
      price: "$199",
      rating: 4.8,
      category: "Web Development",
      image: "webdev.avif"
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      tutor: "Sarah Chen",
      hours: 18,
      price: "$179",
      rating: 4.7,
      category: "Web Development",
      image: "webdev.avif"
    },
    {
      id: 3,
      title: "Node.js Fundamentals",
      tutor: "Michael Brown",
      hours: 20,
      price: "$189",
      rating: 4.6,
      category: "Web Development",
      image: "java1.jpg"
    },
    {
      id: 4,
      title: "Vue.js Complete Guide",
      tutor: "Emily Wilson",
      hours: 22,
      price: "$195",
      rating: 4.7,
      category: "Web Development",
      image: "vue1.png"
    },
    {
      id: 5,
      title: "Angular Pro",
      tutor: "David Lee",
      hours: 26,
      price: "$209",
      rating: 4.5,
      category: "Web Development",
      image: "angular.png"
    },
    {
      id: 6,
      title: "HTML5 & CSS3 Modern Techniques",
      tutor: "Jessica Kim",
      hours: 15,
      price: "$149",
      rating: 4.9,
      category: "Web Development",
      image: "html.jpg"
    },
    {
      id: 7,
      title: "TypeScript Deep Dive",
      tutor: "Robert Taylor",
      hours: 16,
      price: "$169",
      rating: 4.8,
      category: "Web Development",
      image: "Type.jpeg"
    },
    {
      id: 8,
      title: "Next.js for Production",
      tutor: "Amanda Smith",
      hours: 18,
      price: "$189",
      rating: 4.9,
      category: "Web Development",
      image: "next.webp"
    },
    {
      id: 9,
      title: "GraphQL API Development",
      tutor: "Daniel Park",
      hours: 20,
      price: "$199",
      rating: 4.7,
      category: "Web Development",
      image: "graphQL.png"
    },
    {
      id: 10,
      title: "Web Performance Optimization",
      tutor: "Lisa Wong",
      hours: 14,
      price: "$159",
      rating: 4.8,
      category: "Web Development",
      image: "webperformance.webp"
    },
    {
      id: 11,
      title: "Web Security Fundamentals",
      tutor: "Kevin Martin",
      hours: 16,
      price: "$169",
      rating: 4.9,
      category: "Web Development",
      image: "cybersecurity.jpg"
    },
    {
      id: 12,
      title: "Progressive Web Apps",
      tutor: "Olivia Davis",
      hours: 18,
      price: "$179",
      rating: 4.7,
      category: "Web Development",
      image: "pwa.webp"
    },
    {
      id: 13,
      title: "Web Accessibility",
      tutor: "Brian Clark",
      hours: 12,
      price: "$139",
      rating: 4.8,
      category: "Web Development",
      image: "Web-Accessibility-twitter.jpg"
    },
    {
      id: 14,
      title: "Webpack Complete Guide",
      tutor: "Sophia Martinez",
      hours: 16,
      price: "$169",
      rating: 4.6,
      category: "Web Development",
      image: "webdev.avif"
    },
    {
      id: 15,
      title: "Testing JavaScript Applications",
      tutor: "Eric Wilson",
      hours: 20,
      price: "$189",
      rating: 4.7,
      category: "Web Development",
      image: "javatest.png"
    },

    // Data Science (15 courses)
    {
      id: 16,
      title: "Python for Data Science",
      tutor: "Sarah Chen",
      hours: 32,
      price: "$249",
      rating: 4.9,
      category: "Data Science",
      image: "dataAnalysis.avif"
    },
    {
      id: 17,
      title: "Machine Learning Fundamentals",
      tutor: "Michael Brown",
      hours: 36,
      price: "$279",
      rating: 4.8,
      category: "Data Science",
      image: "artificial.webp"
    },
    {
      id: 18,
      title: "Deep Learning with TensorFlow",
      tutor: "Emily Wilson",
      hours: 40,
      price: "$299",
      rating: 4.7,
      category: "Data Science",
      image: "Tensorflow.jpg"
    },
    {
      id: 19,
      title: "Data Visualization with Python",
      tutor: "David Lee",
      hours: 24,
      price: "$199",
      rating: 4.9,
      category: "Data Science",
      image: "dataAnalysis.avif"
    },
    {
      id: 20,
      title: "Big Data with Spark",
      tutor: "Jessica Kim",
      hours: 28,
      price: "$229",
      rating: 4.6,
      category: "Data Science",
      image: "Bigdata.jpg"
    },
    {
      id: 21,
      title: "Natural Language Processing",
      tutor: "Robert Taylor",
      hours: 30,
      price: "$239",
      rating: 4.8,
      category: "Data Science",
      image: "nlp.jpg"
    },
    {
      id: 22,
      title: "Computer Vision",
      tutor: "Amanda Smith",
      hours: 34,
      price: "$269",
      rating: 4.7,
      category: "Data Science",
      image: "computervis.png"
    },
    {
      id: 23,
      title: "Data Engineering",
      tutor: "Daniel Park",
      hours: 38,
      price: "$289",
      rating: 4.8,
      category: "Data Science",
      image: "Data-Engineering.jpg"
    },
    {
      id: 24,
      title: "Time Series Analysis",
      tutor: "Lisa Wong",
      hours: 26,
      price: "$219",
      rating: 4.9,
      category: "Data Science",
      image: "Times.webp"
    },
    {
      id: 25,
      title: "SQL for Data Analysis",
      tutor: "Kevin Martin",
      hours: 20,
      price: "$189",
      rating: 4.8,
      category: "Data Science",
      image: "sql.png"
    },
    {
      id: 26,
      title: "R Programming",
      tutor: "Olivia Davis",
      hours: 22,
      price: "$199",
      rating: 4.7,
      category: "Data Science",
      image: "R.jpg"
    },
    {
      id: 27,
      title: "Data Mining",
      tutor: "Brian Clark",
      hours: 28,
      price: "$229",
      rating: 4.6,
      category: "Data Science",
      image: "datamining.jpg"
    },
    {
      id: 28,
      title: "AI Ethics",
      tutor: "Sophia Martinez",
      hours: 16,
      price: "$169",
      rating: 4.9,
      category: "Data Science",
      image: "artificial.webp"
    },
    {
      id: 29,
      title: "Tableau Masterclass",
      tutor: "Eric Wilson",
      hours: 18,
      price: "$179",
      rating: 4.8,
      category: "Data Science",
      image: "/tablu.png"
    },
    {
      id: 30,
      title: "Power BI Fundamentals",
      tutor: "Alex Johnson",
      hours: 20,
      price: "$189",
      rating: 4.7,
      category: "Data Science",
      image: "powerbi.jpg"
    },

    // Mobile Development (15 courses)
    {
      id: 31,
      title: "Flutter Development",
      tutor: "Sarah Chen",
      hours: 30,
      price: "$239",
      rating: 4.8,
      category: "Mobile Development",
      image: "flutter.png"
    },
    {
      id: 32,
      title: "React Native Pro",
      tutor: "Michael Brown",
      hours: 28,
      price: "$229",
      rating: 4.9,
      category: "Mobile Development",
      image: "reactnat.webp"
    },
    {
      id: 33,
      title: "iOS with SwiftUI",
      tutor: "Emily Wilson",
      hours: 34,
      price: "$259",
      rating: 4.7,
      category: "Mobile Development",
      image: "swift.webp"
    },
    {
      id: 34,
      title: "Android with Kotlin",
      tutor: "David Lee",
      hours: 32,
      price: "$249",
      rating: 4.8,
      category: "Mobile Development",
      image: "kotlin.png"
    },
    {
      id: 35,
      title: "Mobile UI/UX Design",
      tutor: "Jessica Kim",
      hours: 24,
      price: "$199",
      rating: 4.9,
      category: "Mobile Development",
      image: "Userinterface.avif"
    },
    {
      id: 36,
      title: "Cross-Platform Development",
      tutor: "Robert Taylor",
      hours: 26,
      price: "$219",
      rating: 4.7,
      category: "Mobile Development",
      image: "reactnat.webp"
    },
    {
      id: 37,
      title: "Mobile App Security",
      tutor: "Amanda Smith",
      hours: 20,
      price: "$189",
      rating: 4.8,
      category: "Mobile Development",
      image: "cybersecurity.jpg"
    },
    {
      id: 38,
      title: "Firebase for Mobile",
      tutor: "Daniel Park",
      hours: 18,
      price: "$179",
      rating: 4.9,
      category: "Mobile Development",
      image: "firebase.jpg"
    },
    {
      id: 39,
      title: "Mobile Game Development",
      tutor: "Lisa Wong",
      hours: 30,
      price: "$239",
      rating: 4.6,
      category:"Game Development",
      image: "Gamedevelopment.jpg"
    },
    {
      id: 40,
      title: "Mobile DevOps",
      tutor: "Kevin Martin",
      hours: 22,
      price: "$199",
      rating: 4.7,
      category: "Mobile Development",
      image: "mobiledevop.webp"
    },
    {
      id: 41,
      title: "Mobile Testing",
      tutor: "Olivia Davis",
      hours: 20,
      price: "$189",
      rating: 4.8,
      category: "Mobile Development",
      image: "mobiletesting.jpg"
    },
    {
      id: 42,
      title: "Mobile Analytics",
      tutor: "Brian Clark",
      hours: 16,
      price: "$169",
      rating: 4.7,
      category: "Mobile Development",
      image: "mobileanal.png"
    },
    {
      id: 43,
      title: "AR/VR Mobile Apps",
      tutor: "Sophia Martinez",
      hours: 28,
      price: "$229",
      rating: 4.9,
      category: "Mobile Development",
      image: "vr.jpg"
    },
    {
      id: 44,
      title: "Mobile Payment Systems",
      tutor: "Eric Wilson",
      hours: 18,
      price: "$179",
      rating: 4.8,
      category: "Mobile Development",
      image: "mobilepay.webp"
    },
    {
      id: 45,
      title: "Blockchain Mobile Apps",
      tutor: "Alex Johnson",
      hours: 24,
      price: "$199",
      rating: 4.7,
      category: "Mobile Development",
      image: "blockchain.webp"
    }
  ];


export default allCourses