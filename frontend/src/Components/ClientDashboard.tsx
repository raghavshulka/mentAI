"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../Components/ui/dialog";
import { Client, Booking } from "../lib/types";
import { ScrollArea } from "./ui/ScrollArea";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Theme } from "@radix-ui/themes";
import axios from "axios";
import {
  AlertCircle,
  Calendar,
  Clock,
  User,
  Mail,
  Cake,
  FileText,
  Edit,
  LogOut,
  MapPin,
  Heart,
  BookOpen,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import "@radix-ui/themes/styles.css";

interface ClientDashboardProps {
  clientId: number;
  onSignOut: () => void;
}

const ClientDashboard: React.FC<ClientDashboardProps> = ({
  clientId,
  onSignOut,
}) => {
  const [client, setClient] = useState<Client | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [medicalHistory, setMedicalHistory] = useState<string | undefined>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("personal-info");

  useEffect(() => {
    const fetchClient = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/client/clients/${clientId}`,
          {
            headers: {
              "Cache-Control": "no-cache",
              Pragma: "no-cache",
              Expires: "0",
            },
          }
        );
        setClient(response.data);
        setMedicalHistory(response.data.medicalHistory);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch client data:", error);
        setError("Failed to load client data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchClient();
  }, [clientId]);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/client/clients/${clientId}`,
        { medicalHistory }
      );
      setClient(response.data);
      setIsEditing(false);
      setError(null);
    } catch (error) {
      console.error("Failed to update client data:", error);
      setError("Failed to update medical history. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-xl text-violet-600 font-semibold">
          Loading...
        </div>
      </div>
    );
  }

  if (!client && !error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-violet-600 font-semibold">
          No client data available.
        </div>
      </div>
    );
  }

  return (
    <Theme
      appearance="light"
      accentColor="violet"
      grayColor="mauve"
      radius="large"
      scaling="95%"
    >
      <div className="container mx-auto p-6 space-y-6 min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100 via-purple-100 to-pink-100">
        {/* Main Card */}
        <div className="relative">
          {/* Decorative background elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 backdrop-blur-3xl rounded-3xl" />
          <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 rounded-3xl blur-2xl" />

          <Card className="relative border-none shadow-2xl bg-white/80 backdrop-blur-lg transition-all duration-500 hover:shadow-violet-200/50">
            <CardHeader className="space-y-1 border-b border-violet-100/50 pb-7 mb-4">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-fuchsia-500 bg-clip-text text-transparent">
                Welcome Back, {client?.user?.name}
              </CardTitle>
              <CardDescription className="text-lg text-gray-500">
                Your personal space for growth and healing
              </CardDescription>
            </CardHeader>

            <CardContent className="relative z-10">
              {error && (
                <Alert
                  variant="destructive"
                  className="mb-6 bg-red-50/90 border border-red-200"
                >
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>We're here to support you</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="flex mb-4 border-b border-violet-100/50">
                <TabButton
                  isActive={activeTab === "personal-info"}
                  onClick={() => setActiveTab("personal-info")}
                >
                  Personal Information
                </TabButton>
                <TabButton
                  isActive={activeTab === "journey"}
                  onClick={() => setActiveTab("journey")}
                >
                  Your Journey
                </TabButton>
              </div>

              {activeTab === "personal-info" && (
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <InfoCard
                      icon={User}
                      title="Name"
                      value={client?.user?.name || "N/A"}
                      color="violet"
                    />
                    <InfoCard
                      icon={Mail}
                      title="Email"
                      value={client?.user?.email || "N/A"}
                      color="fuchsia"
                    />
                    <InfoCard
                      icon={Cake}
                      title="Date of Birth"
                      value={client?.dateOfBirth || "N/A"}
                      color="pink"
                    />
                  </div>
                  <div className="bg-gradient-to-br from-violet-50/90 to-fuchsia-50/90 p-6 rounded-xl shadow-inner backdrop-blur-sm">
                    <div className="flex items-center space-x-3 mb-3">
                      <Heart className="h-6 w-6 text-pink-600" />
                      <span className="font-semibold text-lg bg-gradient-to-r from-violet-700 to-fuchsia-700 bg-clip-text text-transparent">
                        Quick Reflection
                      </span>
                    </div>
                    <p className="text-sm text-violet-600/90 italic">
                      "Every step forward is a victory. Your journey is unique
                      and valuable."
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "journey" && (
                <div className="bg-gradient-to-br from-violet-50/90 to-fuchsia-50/90 p-6 rounded-xl shadow-inner backdrop-blur-sm">
                  <div className="flex items-center space-x-3 mb-3">
                    <BookOpen className="h-6 w-6 text-violet-600" />
                    <span className="font-semibold text-lg bg-gradient-to-r from-violet-700 to-fuchsia-700 bg-clip-text text-transparent">
                      Your Journey
                    </span>
                  </div>
                  <ScrollArea className="h-[200px] w-full rounded-md border border-violet-200/50 p-4 bg-white/90 backdrop-blur-sm">
                    <p className="text-sm text-violet-600/90">
                      {client?.medicalHistory ||
                        "Your journey is just beginning. Feel free to add your experiences here."}
                    </p>
                  </ScrollArea>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-between border-t border-violet-100/50 pt-6 mt-4">
              <Dialog open={isEditing} onOpenChange={setIsEditing}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-violet-50 to-fuchsia-50 text-violet-700 hover:bg-violet-100 hover:text-violet-800 transition-all duration-300 shadow-sm hover:shadow-md border border-violet-200/30">
                    <Edit className="mr-2 h-4 w-4" />
                    Update Your Journey
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-white/95 backdrop-blur-lg">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold bg-gradient-to-r from-violet-700 to-fuchsia-700 bg-clip-text text-transparent">
                      Your Journey
                    </DialogTitle>
                    <DialogDescription className="text-violet-600/90">
                      Reflect on your experiences and growth. Your story
                      matters.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label
                        htmlFor="medical-history"
                        className="text-lg font-medium text-violet-700"
                      >
                        Your Experiences
                      </Label>
                      <Textarea
                        id="medical-history"
                        value={medicalHistory}
                        onChange={(e) => setMedicalHistory(e.target.value)}
                        placeholder="Share your journey..."
                        rows={5}
                        className="resize-none border-2 border-violet-200 focus:border-violet-400 transition-all duration-300"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={handleUpdate}
                      className="bg-violet-600 text-white hover:bg-violet-700 transition-all duration-300"
                    >
                      Save Your Journey
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button
                variant="ghost"
                onClick={onSignOut}
                className="text-pink-500 hover:text-pink-700 hover:bg-pink-50/50 transition-all duration-300"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Bookings Card */}
        <Card className="relative border-none shadow-2xl bg-white/80 backdrop-blur-lg transition-all duration-500 hover:shadow-violet-200/50">
          <CardHeader className="border-b border-violet-100/50 pb-4 mb-4">
            <CardTitle className="text-2xl font-semibold bg-gradient-to-r from-violet-700 to-fuchsia-700 bg-clip-text text-transparent">
              Your Support Sessions
            </CardTitle>
            <CardDescription className="text-violet-600/90">
              View your upcoming and past support sessions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {client?.bookings && client.bookings.length > 0 ? (
              <ScrollArea className="h-[300px] w-full rounded-md">
                <div className="space-y-4 pr-4">
                  {client.bookings.map((booking: Booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <p className="text-center text-violet-600/90 py-8">
                No support sessions scheduled. Remember, it's okay to ask for
                help.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </Theme>
  );
};

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({
  isActive,
  onClick,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 font-medium text-sm transition-all duration-300 ${
        isActive
          ? "text-violet-800 border-b-2 border-violet-600 bg-violet-50/50"
          : "text-violet-400 hover:text-violet-400 hover:bg-violet-50/30"
      }`}
    >
      {children}
    </button>
  );
};

interface InfoCardProps {
  icon: React.ElementType;
  title: string;
  value: string;
  color: "violet" | "fuchsia" | "pink";
}

const InfoCard: React.FC<InfoCardProps> = ({
  icon: Icon,
  title,
  value,
  color,
}) => {
  const colorClasses = {
    violet: "from-violet-50/90 to-violet-100/50 text-violet-700",
    fuchsia: "from-fuchsia-50/90 to-fuchsia-100/50 text-fuchsia-700",
    pink: "bg-gradient-to-r from-pink-50/90 to-pink-100/50 text-pink-700",
  };

  return (
    <div
      className={`flex items-center space-x-3 p-4 bg-gradient-to-r ${colorClasses[color]} rounded-lg shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md border border-${color}-200/30`}
    >
      <Icon className={`h-5 w-5 text-${color}-600`} />
      <div>
        <span className="font-medium">{title}</span>
        <p className={`text-${color}-700`}>{value}</p>
      </div>
    </div>
  );
};

interface BookingCardProps {
  booking: Booking;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  return (
    <div className="bg-gradient-to-r from-violet-50/90 to-fuchsia-50/90 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md border border-violet-200/30 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-violet-600" />
          <span className="text-sm font-medium text-violet-700">
            {new Date(booking.createdAt).toLocaleDateString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-fuchsia-600" />
          <span className="text-sm text-fuchsia-700">
            {new Date(booking.createdAt).toLocaleTimeString(undefined, {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-2 mb-2">
        <MapPin className="h-4 w-4 text-violet-600" />
        <span className="text-sm text-violet-700">
          {booking.location || "Location not specified"}
        </span>
      </div>
      <p className="text-sm font-medium flex items-center">
        Status:
        <span
          className={`ml-2 px-2 py-1 rounded-full text-xs ${
            booking.status === "confirmed"
              ? "bg-emerald-100/70 text-emerald-700 border border-emerald-200/50"
              : "bg-amber-100/70 text-amber-700 border border-amber-200/50"
          }`}
        >
          {booking.status}
        </span>
      </p>
      {booking.notes && (
        <div className="mt-2 p-2 bg-white/50 rounded-md border border-violet-100/30">
          <p className="text-sm text-violet-600/90 italic">{booking.notes}</p>
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;
