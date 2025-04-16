

const {client} = require('./src/mongo')

const users = [
    {
      auth0_id: "auth0|001",
      name: "Alice Johnson",
      email: "alice.johnson@email.com",
      location: { latitude: "40.7128", longitude: "-74.0060" },
      city: "New York",
      movies: ["Inception", "Interstellar", "The Matrix"],
      books: ["1984", "To Kill a Mockingbird", "Dune"],
      music: ["Pop", "Rock", "Classical"],
      yearOfBirth: "1990",
      aboutMe: "Tech enthusiast and bookworm.",
      gender: "Female",
      sun: "Leo",
      moon: "Virgo",
      asc: "Libra",
      picture_url:'https://i.ibb.co/Qj3vps6P/cef45a4128d3.jpg',
      favs:[]
    },
    {
      auth0_id: "auth0|002",
      name: "Bob Smith",
      email: "bob.smith@email.com",
      location: { latitude: "34.0522", longitude: "-118.2437" },
      city: "Los Angeles",
      movies: ["Fight Club", "Pulp Fiction", "The Dark Knight"],
      books: ["Brave New World", "Moby Dick", "The Hobbit"],
      music: ["Hip Hop", "Jazz", "Rock"],
      yearOfBirth: "1985",
      aboutMe: "Music producer and movie buff.",
      gender: "Male",
      sun: "Sagittarius",
      moon: "Virgo",
      asc: "Aries",
      picture_url:'https://i.ibb.co/Qj3vps6P/cef45a4128d3.jpg',
      favs:[]
    },
    {
      auth0_id: "auth0|003",
      name: "Charlie Davis",
      email: "charlie.davis@email.com",
      location: { latitude: "51.5074", longitude: "-0.1278" },
      city: "London",
      movies: ["Harry Potter", "Sherlock Holmes", "The King's Speech"],
      books: ["Pride and Prejudice", "Great Expectations", "Jane Eyre"],
      music: ["Indie", "Classical", "Alternative"],
      yearOfBirth: "1992",
      aboutMe: "Avid reader and tea lover.",
      gender: "Non-binary",
      sun: "Taurus",
      moon: "Virgo",
      asc: "Gemini",
      picture_url:'https://i.ibb.co/Qj3vps6P/cef45a4128d3.jpg',
      favs:[]
    },
    {
      auth0_id: "auth0|004",
      name: "Diana Lee",
      email: "diana.lee@email.com",
      location: { latitude: "37.7749", longitude: "-122.4194" },
      city: "San Francisco",
      movies: ["Blade Runner", "Ex Machina", "Her"],
      books: ["Neuromancer", "Snow Crash", "The Road"],
      music: ["Electronic", "Ambient", "Experimental"],
      yearOfBirth: "1988",
      aboutMe: "Tech geek exploring AI ethics.",
      gender: "Female",
      sun: "Aquarius",
      moon: "Libra",
      asc: "Sagittarius",
      picture_url:'https://i.ibb.co/Qj3vps6P/cef45a4128d3.jpg',
      favs:[]
    },
    {
      auth0_id: "auth0|005",
      name: "Ethan Carter",
      email: "ethan.carter@email.com",
      location: { latitude: "48.8566", longitude: "2.3522" },
      city: "Paris",
      movies: ["Amélie", "Midnight in Paris", "Blue Is the Warmest Color"],
      books: ["Les Misérables", "The Stranger", "Madame Bovary"],
      music: ["Jazz", "Blues", "Classical"],
      yearOfBirth: "1995",
      aboutMe: "Art lover and history enthusiast.",
      gender: "Male",
      sun: "Pisces",
      moon: "Cancer",
      asc: "Virgo",
      picture_url:'https://i.ibb.co/Qj3vps6P/cef45a4128d3.jpg',
      favs:[]
    },
    {
      auth0_id: "auth0|006",
      name: "Fiona Garcia",
      email: "fiona.garcia@email.com",
      location: { latitude: "19.4326", longitude: "-99.1332" },
      city: "Mexico City",
      movies: ["Coco", "Roma", "Pan's Labyrinth"],
      books: ["One Hundred Years of Solitude", "The Alchemist", "Like Water for Chocolate"],
      music: ["Folk", "Latin", "Pop"],
      yearOfBirth: "1993",
      aboutMe: "Creative soul and food lover.",
      gender: "Female",
      sun: "Cancer",
      moon: "Leo",
      asc: "Scorpio",
      picture_url:'https://i.ibb.co/Qj3vps6P/cef45a4128d3.jpg',
      favs:[]
    },
    {
      auth0_id: "auth0|007",
      name: "George Miller",
      email: "george.miller@email.com",
      location: { latitude: "52.5200", longitude: "13.4050" },
      city: "Berlin",
      movies: ["Run Lola Run", "Good Bye Lenin!", "Metropolis"],
      books: ["The Trial", "Steppenwolf", "Berlin Alexanderplatz"],
      music: ["Techno", "Electronic", "Rock"],
      yearOfBirth: "1984",
      aboutMe: "DJ and nightlife explorer.",
      gender: "Male",
      sun: "Capricorn",
      moon: "Aquarius",
      asc: "Taurus",
      picture_url:'https://i.ibb.co/Qj3vps6P/cef45a4128d3.jpg',
      favs:[]
    },
    {
      auth0_id: "auth0|008",
      name: "Hanna Schmidt",
      email: "hanna.schmidt@email.com",
      location: { latitude: "55.7558", longitude: "37.6173" },
      city: "Moscow",
      movies: ["Solaris", "Stalker", "Leviathan"],
      books: ["War and Peace", "Crime and Punishment", "Anna Karenina"],
      music: ["Classical", "Folk", "Jazz"],
      yearOfBirth: "1991",
      aboutMe: "Philosophy student and classic literature lover.",
      gender: "Female",
      sun: "Virgo",
      moon: "Taurus",
      asc: "Cancer",
      picture_url:'https://i.ibb.co/Qj3vps6P/cef45a4128d3.jpg',
      favs:[]
    },
    {
      auth0_id: "auth0|009",
      name: "Isaac Kim",
      email: "isaac.kim@email.com",
      location: { latitude: "37.5665", longitude: "126.9780" },
      city: "Seoul",
      movies: ["Parasite", "Oldboy", "The Handmaiden"],
      books: ["Norwegian Wood", "Kafka on the Shore", "1Q84"],
      music: ["K-Pop", "Jazz", "Hip Hop"],
      yearOfBirth: "1994",
      aboutMe: "Musician and language learner.",
      gender: "Male",
      sun: "Scorpio",
      moon: "Aries",
      asc: "Leo",
      picture_url:'https://i.ibb.co/Qj3vps6P/cef45a4128d3.jpg',
      favs:[]
    },
  ];
  
  async function insertUsers(users) {
    try {
      await client.connect();
      const database = client.db("moonlo");
      const collection = database.collection("users");
      await collection.deleteMany({})
  
      const result = await collection.insertMany(users);
      console.log(`${result.insertedCount} users inserted successfully.`);
    } catch (error) {
      console.error("Error inserting users:", error);
    } finally {
      await client.close();
    }
  }
  
export async function populateMongo(){
    
    await insertUsers(users)
    
}