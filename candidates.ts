import { candidateT } from "./app/vote/page";

const candidates: candidateT[] = [
  // president candidates
  {
    name: "Alice Johnson",
    position: "President",
    faculty: "Science",
    motto: "Knowledge is power",
    votes: Math.floor(Math.random() * 1000),
  },
  {
    name: "David Kwame",
    position: "President",
    faculty: "Business",
    motto: "Leadership through service",
    votes: Math.floor(Math.random() * 1000),
  },
  {
    name: "Emilia Boateng",
    position: "President",
    faculty: "Law",
    motto: "Justice for all",
    votes: Math.floor(Math.random() * 1000),
  },
  {
    name: "Francis Nkrumah",
    position: "President",
    faculty: "Social Sciences",
    motto: "Unity and progress",
    votes: Math.floor(Math.random() * 1000),
  },
  // vice president candidates
  {
    name: "Brian Mensah",
    position: "Vice President",
    faculty: "Engineering",
    motto: "Building the future together",
    votes: Math.floor(Math.random() * 1000),
  },
  {
    name: "Grace Osei",
    position: "Vice President",
    faculty: "Medicine",
    motto: "Health is wealth",
    votes: Math.floor(Math.random() * 1000),
  },
  {
    name: "Henry Adu",
    position: "Vice President",
    faculty: "Agriculture",
    motto: "Growing our nation",
    votes: Math.floor(Math.random() * 1000),
  },
  {
    name: "Irene Tetteh",
    position: "Vice President",
    faculty: "Education",
    motto: "Knowledge for change",
    votes: Math.floor(Math.random() * 1000),
  },
  // secretary candidates
  {
    name: "Claire Owusu",
    position: "Secretary",
    faculty: "Arts",
    motto: "Communication is key",
    votes: Math.floor(Math.random() * 1000),
  },
  {
    name: "James Appiah",
    position: "Secretary",
    faculty: "Computer Science",
    motto: "Connect and record",
    votes: Math.floor(Math.random() * 1000),
  },
  {
    name: "Kofi Yeboah",
    position: "Secretary",
    faculty: "Mathematics",
    motto: "Precision in every word",
    votes: Math.floor(Math.random() * 1000),
  },
  {
    name: "Linda Akoto",
    position: "Secretary",
    faculty: "Nursing",
    motto: "Care with clarity",
    votes: Math.floor(Math.random() * 1000),
  },
];

export default candidates;
