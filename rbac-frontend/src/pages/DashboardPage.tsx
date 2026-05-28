import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getName, getRole, clearAuth } from "../utils/auth";
import { getPublicContent, getUserContent, getAdminContent } from "../api/content";

interface ContentCardProps {
  title: string;
  message?: string;
  isLoading: boolean;
  isError: boolean;
  theme: "blue" | "green" | "purple";
}

function ContentCard({ title, message, isLoading, isError, theme }: ContentCardProps) {
  const themeClasses = {
    blue: {
      border: "border-blue-100",
      bg: "bg-blue-50/40",
      text: "text-blue-700",
      title: "text-blue-900",
      spinner: "border-blue-600",
      errorBg: "bg-blue-50",
      errorText: "text-blue-700",
    },
    green: {
      border: "border-green-100",
      bg: "bg-green-50/40",
      text: "text-green-700",
      title: "text-green-900",
      spinner: "border-green-600",
      errorBg: "bg-green-50",
      errorText: "text-green-700",
    },
    purple: {
      border: "border-purple-100",
      bg: "bg-purple-50/40",
      text: "text-purple-700",
      title: "text-purple-900",
      spinner: "border-purple-600",
      errorBg: "bg-purple-50",
      errorText: "text-purple-700",
    },
  }[theme];

  return (
    <div className={`p-6 rounded-2xl border ${themeClasses.border} ${themeClasses.bg} backdrop-blur-sm transition-all duration-300 hover:shadow-lg`}>
      <h3 className={`text-lg font-semibold ${themeClasses.title} mb-4`}>{title}</h3>

      {isLoading && (
        <div className="flex items-center justify-center py-6">
          <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${themeClasses.spinner}`}></div>
        </div>
      )}

      {isError && (
        <div className={`p-4 rounded-xl ${themeClasses.errorBg} text-sm ${themeClasses.errorText} border border-red-100/50`}>
          Failed to fetch content. Access denied or server unavailable.
        </div>
      )}

      {!isLoading && !isError && message && (
        <div className="py-4">
          <p className={`text-base font-medium ${themeClasses.text} leading-relaxed`}>
            {message}
          </p>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const name = getName() || "User";
  const role = getRole() || "USER";

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  // Queries
  const {
    data: publicData,
    isLoading: isPublicLoading,
    isError: isPublicError,
  } = useQuery({
    queryKey: ["publicContent"],
    queryFn: getPublicContent,
  });

  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery({
    queryKey: ["userContent"],
    queryFn: getUserContent,
    enabled: role === "USER" || role === "ADMIN",
  });

  const {
    data: adminData,
    isLoading: isAdminLoading,
    isError: isAdminError,
  } = useQuery({
    queryKey: ["adminContent"],
    queryFn: getAdminContent,
    enabled: role === "ADMIN",
  });

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Security Console
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">Role-Based Access Control Monitor</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-800">Welcome, {name}</p>
              <p className="text-xs text-slate-500">
                Role: <span className="font-mono text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase">{role}</span>
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-[0.98] transition-all rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-950">Resource Guard Monitor</h2>
          <p className="text-slate-500 text-sm mt-1">
            Real-time validation of endpoints against current token authority.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Always Render Public Content */}
          <ContentCard
            title="Public Resource Access"
            message={publicData?.message}
            isLoading={isPublicLoading}
            isError={isPublicError}
            theme="blue"
          />

          {/* User Resource Card (USER or ADMIN) */}
          {(role === "USER" || role === "ADMIN") && (
            <ContentCard
              title="Standard User Resource"
              message={userData?.message}
              isLoading={isUserLoading}
              isError={isUserError}
              theme="green"
            />
          )}

          {/* Admin Resource Card (ADMIN only) */}
          {role === "ADMIN" && (
            <ContentCard
              title="Restricted Administrative Resource"
              message={adminData?.message}
              isLoading={isAdminLoading}
              isError={isAdminError}
              theme="purple"
            />
          )}
        </div>
      </main>
    </div>
  );
}
