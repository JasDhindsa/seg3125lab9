export interface Tutor {
  id: string;
  name: string;
  photo: string;
  subjects: string[];
  rating: number;
  reviewCount: number;
  pricePerHour: number;
  bio: string;
  availability: {
    [day: string]: string[];
  };
}

export interface Review {
  id: string;
  studentName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Session {
  id: string;
  tutorId: string;
  tutorName: string;
  tutorPhoto: string;
  subject: string;
  date: string;
  time: string;
  duration: number;
  status: "upcoming" | "completed" | "cancelled";
}

export const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "English Literature",
  "History",
  "Economics",
  "Psychology",
  "Statistics",
];

export const tutors: Tutor[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    subjects: ["Mathematics", "Statistics"],
    rating: 4.9,
    reviewCount: 127,
    pricePerHour: 45,
    bio: "PhD in Mathematics with 10+ years of teaching experience. Specialized in calculus, linear algebra, and statistics. Patient and dedicated to helping students achieve their academic goals.",
    availability: {
      Monday: ["09:00", "10:00", "14:00", "15:00", "16:00"],
      Tuesday: ["10:00", "11:00", "14:00", "15:00"],
      Wednesday: ["09:00", "10:00", "13:00", "14:00", "15:00"],
      Thursday: ["10:00", "11:00", "14:00", "16:00"],
      Friday: ["09:00", "10:00", "11:00", "14:00"],
    },
  },
  {
    id: "2",
    name: "Prof. Michael Chen",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    subjects: ["Physics", "Computer Science"],
    rating: 4.8,
    reviewCount: 98,
    pricePerHour: 50,
    bio: "Former university professor with expertise in quantum physics and programming. Making complex topics simple and engaging for students of all levels.",
    availability: {
      Monday: ["13:00", "14:00", "15:00", "16:00"],
      Tuesday: ["09:00", "10:00", "13:00", "14:00"],
      Wednesday: ["10:00", "11:00", "15:00", "16:00"],
      Thursday: ["09:00", "13:00", "14:00", "15:00"],
      Friday: ["13:00", "14:00", "15:00", "16:00"],
    },
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    subjects: ["Chemistry", "Biology"],
    rating: 4.9,
    reviewCount: 143,
    pricePerHour: 40,
    bio: "Biochemistry graduate with a passion for life sciences. Helping students excel in chemistry and biology through interactive and practical learning methods.",
    availability: {
      Monday: ["10:00", "11:00", "14:00", "15:00"],
      Tuesday: ["09:00", "10:00", "11:00", "15:00", "16:00"],
      Wednesday: ["09:00", "10:00", "14:00", "15:00"],
      Thursday: ["10:00", "11:00", "14:00", "15:00", "16:00"],
      Friday: ["09:00", "10:00", "11:00", "14:00"],
    },
  },
  {
    id: "4",
    name: "David Thompson",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    subjects: ["English Literature", "History"],
    rating: 4.7,
    reviewCount: 89,
    pricePerHour: 38,
    bio: "English and History teacher with 8 years of experience. Specializing in essay writing, literary analysis, and historical research methods.",
    availability: {
      Monday: ["09:00", "10:00", "11:00", "15:00"],
      Tuesday: ["10:00", "14:00", "15:00", "16:00"],
      Wednesday: ["09:00", "10:00", "11:00", "14:00"],
      Thursday: ["09:00", "10:00", "15:00", "16:00"],
      Friday: ["10:00", "11:00", "14:00", "15:00"],
    },
  },
  {
    id: "5",
    name: "Jessica Park",
    photo: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop",
    subjects: ["Economics", "Statistics"],
    rating: 4.8,
    reviewCount: 112,
    pricePerHour: 42,
    bio: "Economics researcher and statistics expert. Experienced in microeconomics, macroeconomics, and econometrics. Clear explanations for complex concepts.",
    availability: {
      Monday: ["13:00", "14:00", "15:00"],
      Tuesday: ["09:00", "10:00", "11:00", "14:00"],
      Wednesday: ["13:00", "14:00", "15:00", "16:00"],
      Thursday: ["09:00", "10:00", "11:00", "14:00"],
      Friday: ["13:00", "14:00", "15:00", "16:00"],
    },
  },
  {
    id: "6",
    name: "Robert Williams",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    subjects: ["Computer Science", "Mathematics"],
    rating: 4.9,
    reviewCount: 156,
    pricePerHour: 48,
    bio: "Software engineer and math tutor. Expert in algorithms, data structures, discrete math, and programming languages including Python, Java, and C++.",
    availability: {
      Monday: ["14:00", "15:00", "16:00", "17:00"],
      Tuesday: ["14:00", "15:00", "16:00"],
      Wednesday: ["14:00", "15:00", "16:00", "17:00"],
      Thursday: ["14:00", "15:00", "16:00"],
      Friday: ["14:00", "15:00", "16:00", "17:00"],
    },
  },
];

export const reviews: { [tutorId: string]: Review[] } = {
  "1": [
    {
      id: "r1",
      studentName: "Alex M.",
      rating: 5,
      comment: "Dr. Johnson is an excellent tutor! She explains complex calculus concepts in a way that's easy to understand.",
      date: "2026-03-01",
    },
    {
      id: "r2",
      studentName: "Jordan K.",
      rating: 5,
      comment: "Very patient and knowledgeable. Helped me improve my grade from C to A in statistics.",
      date: "2026-02-25",
    },
    {
      id: "r3",
      studentName: "Sam L.",
      rating: 4,
      comment: "Great tutor, very helpful with exam preparation.",
      date: "2026-02-20",
    },
  ],
  "2": [
    {
      id: "r4",
      studentName: "Chris P.",
      rating: 5,
      comment: "Prof. Chen makes physics fun and understandable. Highly recommend!",
      date: "2026-03-03",
    },
    {
      id: "r5",
      studentName: "Taylor R.",
      rating: 5,
      comment: "Excellent programming tutor. Helped me ace my CS course.",
      date: "2026-02-28",
    },
  ],
  "3": [
    {
      id: "r6",
      studentName: "Morgan B.",
      rating: 5,
      comment: "Emily is amazing! She helped me understand organic chemistry finally.",
      date: "2026-03-05",
    },
    {
      id: "r7",
      studentName: "Riley T.",
      rating: 5,
      comment: "Best biology tutor I've had. Very engaging and patient.",
      date: "2026-03-02",
    },
  ],
};

export const mockSessions: Session[] = [
  {
    id: "s1",
    tutorId: "1",
    tutorName: "Dr. Sarah Johnson",
    tutorPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    subject: "Mathematics",
    date: "2026-03-12",
    time: "14:00",
    duration: 60,
    status: "upcoming",
  },
  {
    id: "s2",
    tutorId: "3",
    tutorName: "Emily Rodriguez",
    tutorPhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    subject: "Chemistry",
    date: "2026-03-15",
    time: "10:00",
    duration: 90,
    status: "upcoming",
  },
  {
    id: "s3",
    tutorId: "2",
    tutorName: "Prof. Michael Chen",
    tutorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    subject: "Physics",
    date: "2026-03-05",
    time: "13:00",
    duration: 60,
    status: "completed",
  },
  {
    id: "s4",
    tutorId: "6",
    tutorName: "Robert Williams",
    tutorPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    subject: "Computer Science",
    date: "2026-03-01",
    time: "15:00",
    duration: 60,
    status: "completed",
  },
];
