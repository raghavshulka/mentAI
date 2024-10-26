import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../Components/ui/button";
import { Input } from "../Components/ui/input";
import { Label } from "../Components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../Components/ui/card";
import { Alert, AlertDescription } from "../Components/ui/alert";
import { AlertCircle, LogIn, Sparkles } from "lucide-react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill out both fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/v1/signin/users", {
        email,
        password,
      });

      // Check if the response is successful
      if (response.status === 200) {
        const { token, role, userId } = response.data;

        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("role", role);
          localStorage.setItem("userId", userId.toString());
          navigate("/dashboard");
        } else {
          setError("Authentication failed. Please try again.");
        }
      } else {
        setError("Failed to sign in. Please check your credentials and try again.");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        "Failed to sign in. Please check your credentials and try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-black-700">Welcome Back</CardTitle>
          <CardDescription className="text-lg text-black-600">Sign in to continue your journey</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSignIn} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-black-700">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-blue-300 focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-black-700">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-blue-300 focus:border-blue-500"
                placeholder="Enter your password"
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors">
              <LogIn className="w-5 h-5 mr-2" />
              Sign In
            </Button>
          </form>
          <div className="mt-4 text-center">
            <span className="text-gray-600">Don't have an account? </span>
            <a href="/sign-up" className="text-black-600 hover:text-black-700 transition-colors font-semibold">
              Sign up
            </a>
          </div>
        </CardContent>
      </Card>
      <div className="fixed bottom-4 right-4">
        <Sparkles className="w-8 h-8 text-black-600 animate-pulse" />
      </div>
    </div>
  );
}
