import { useState } from "react"
import { Button } from "../Components/ui/button"
import { Input } from "../Components/ui/input"
import { Textarea } from "../Components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "../Components/ui/radio-group"
import { Label } from "../Components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../Components/ui/card"
import { AlertCircle, Brain, Sparkles, User, UserPlus } from "lucide-react"
import { Alert, AlertDescription } from "../Components/ui/alert"
import axios from "axios"
import { useNavigate } from "react-router-dom";

type Role = "CLIENT" | "THERAPIST"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [medicalHistory, setMedicalHistory] = useState("")
  const [bio, setBio] = useState("")
  const [specialties, setSpecialties] = useState<string[]>([])
  const [education, setEducation] = useState("")
  const [experience, setExperience] = useState<number | "">("")
  const [hourlyRate, setHourlyRate] = useState<number | "">("")
  const [role, setRole] = useState<Role | null>(null)
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate();

  const handleSignIn = async () => {
    if (!email || !password || !name || !role) {
      setError("Please fill out all required fields and select a role.")
      return
    }
    try {
      const response = await axios.post("http://localhost:3000/api/v1/users/users", {
        email,
        password,
        name,
        role,
      });
      const userId = response.data.id;
      if (role === "CLIENT") {
        await createClient(userId);
      }
      if (role === "THERAPIST") {
        await createTherapist(userId);
      }
      navigate("/sign-in");
      console.log("Signing in with:", { email, password, name, role })
    } catch (error) {
      console.error("Error signing in:", error);
      setError("Failed to sign in.");
    }
  }

  const createClient = async (userId: number) => {
    try {
      await axios.post("http://localhost:3000/api/v1/client/clients", {
        userId,
        dateOfBirth,
        medicalHistory,
      });
      console.log("Client created successfully");
    } catch (error) {
      console.error("Error creating client:", error);
      setError("Failed to create client.");
    }
  };

  const createTherapist = async (userId: number) => {
    try {
      const therapistData = {
        userId,
        bio,
        specialties,
        education,
        experience: experience === "" ? 0 : experience,
        hourlyRate: hourlyRate === "" ? 0 : hourlyRate,
      };
      await axios.post("http://localhost:3000/api/v1/thrpy/therapists", therapistData);
      console.log("Therapist created successfully");
    } catch (error) {
      console.error("Error creating therapist:", error);
      setError("Failed to create therapist.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-100 p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-700">
            Welcome to <span className="text-blue-600">MentAI</span>
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Begin your journey to better mental health
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={(e) => { e.preventDefault(); handleSignIn(); }} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-blue-300 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-blue-300 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border-blue-300 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-700">Select Your Role</Label>
              <RadioGroup onValueChange={(value) => setRole(value as Role)} className="flex space-x-4">
                <div className="flex items-center space-x-2 bg-gray-100 p-3 rounded-lg shadow-sm transition-all hover:shadow-md">
                  <RadioGroupItem value="CLIENT" id="client" />
                  <Label htmlFor="client" className="flex items-center cursor-pointer">
                    <User className="w-5 h-5 mr-2 text-gray-600" />
                    <span>Client</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 bg-white p-3 rounded-lg shadow-sm transition-all hover:shadow-md">
                  <RadioGroupItem value="THERAPIST" id="therapist" />
                  <Label htmlFor="therapist" className="flex items-center cursor-pointer">
                    <Brain className="w-5 h-5 mr-2 text-gray-600" />
                    <span>Therapist</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {role === "CLIENT" && (
              <div className="space-y-4 bg-blue-50 p-4 rounded-lg shadow-sm">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth" className="text-gray-700">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="border-blue-300 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="medicalHistory" className="text-gray-700">Medical History</Label>
                  <Textarea
                    id="medicalHistory"
                    value={medicalHistory}
                    onChange={(e) => setMedicalHistory(e.target.value)}
                    rows={3}
                    className="border-blue-300 focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {role === "THERAPIST" && (
              <div className="space-y-4 bg-blue-50 p-4 rounded-lg shadow-sm">
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-gray-700">Bio</Label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    required
                    className="border-blue-300 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialties" className="text-gray-700">Specialties (comma-separated)</Label>
                  <Input
                    id="specialties"
                    value={specialties.join(",")}
                    type="text"
                    onChange={(e) => setSpecialties(e.target.value.split(","))}
                    className="border-blue-300 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="education" className="text-gray-700">Education</Label>
                  <Input
                    id="education"
                    type="text"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    className="border-blue-300 focus:border-blue-500"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="experience" className="text-gray-700">Experience (years)</Label>
                    <Input
                      id="experience"
                      type="number"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value === "" ? "" : Number(e.target.value))}
                      className="border-blue-300 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hourlyRate" className="text-gray-700">Hourly Rate</Label>
                    <Input
                      id="hourlyRate"
                      type="number"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(e.target.value === "" ? "" : Number(e.target.value))}
                      className="border-blue-300 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <UserPlus className="w-5 h-5 mr-2" />
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="fixed bottom-4 right-4">
        <Sparkles className="w-8 h-8 text-gray-600 animate-pulse" />
      </div>
    </div>
  )
}