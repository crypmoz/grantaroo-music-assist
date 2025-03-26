
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useChatbot } from "@/context/ChatbotContext";
import { FileText, Info, PieChart, Tags, Clock, File } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export const ApplicationGuideTab = () => {
  const { uploadedFiles, grantProfile, userProfile } = useChatbot();
  const [currentSection, setCurrentSection] = useState<string>("overview");
  
  // Content extracted from user information
  const profile = userProfile || grantProfile || null;
  
  const sections = [
    { id: "overview", label: "Overview", icon: <Info className="h-4 w-4" /> },
    { id: "budget", label: "Budget Guidance", icon: <PieChart className="h-4 w-4" /> },
    { id: "keywords", label: "Key Terms", icon: <Tags className="h-4 w-4" /> },
    { id: "timeline", label: "Timeline", icon: <Clock className="h-4 w-4" /> },
  ];

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };
  
  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-1 px-4 py-6">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-blue-100 p-2 rounded-full">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-blue-700">Application Insights</h3>
                <p className="text-xs text-blue-500">
                  Key information extracted from your documents and profile
                </p>
              </div>
            </div>

            <div className="flex overflow-x-auto pb-2 mb-4 gap-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant={currentSection === section.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentSection(section.id)}
                  className={cn(
                    "flex items-center gap-2 flex-shrink-0",
                    currentSection === section.id ? "bg-blue-600" : "bg-white"
                  )}
                >
                  {section.icon}
                  {section.label}
                </Button>
              ))}
            </div>

            {uploadedFiles.length > 0 ? (
              <Card className="border border-blue-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-blue-700">
                    {currentSection === "overview" && "Application Overview"}
                    {currentSection === "budget" && "Budget Analysis"}
                    {currentSection === "keywords" && "Key Terms & Concepts"}
                    {currentSection === "timeline" && "Project Timeline"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {currentSection === "overview" && (
                    <div className="space-y-4">
                      <div className="bg-blue-50 rounded-lg p-4 mb-4">
                        <h4 className="font-medium text-blue-700 mb-2">Uploaded Documents</h4>
                        <div className="space-y-2">
                          {uploadedFiles.map((file) => (
                            <div key={file.id} className="flex items-center gap-2 bg-white p-2 rounded-md">
                              <File className="h-4 w-4 text-blue-600" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{file.name}</p>
                                <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-gray-700">
                        Based on your uploaded documents, we've analyzed key aspects of your grant application.
                        {profile && ` As a ${profile.careerStage} musician in the ${profile.genre} genre, here are some key points to consider.`}
                      </p>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium text-blue-700">Key Strengths</h4>
                        <ul className="list-disc list-inside text-gray-700">
                          <li>Clear artistic vision and unique approach</li>
                          <li>Well-defined project scope and objectives</li>
                          <li>Realistic timeline and implementation plan</li>
                        </ul>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium text-blue-700">Areas for Improvement</h4>
                        <ul className="list-disc list-inside text-gray-700">
                          <li>More detailed budget breakdown recommended</li>
                          <li>Strengthen community impact description</li>
                          <li>Add more specific metrics for success evaluation</li>
                        </ul>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="font-medium text-blue-700 mb-2">Application Completeness</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span>Project Description</span>
                              <span className="font-medium">85%</span>
                            </div>
                            <Progress value={85} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span>Budget Details</span>
                              <span className="font-medium">60%</span>
                            </div>
                            <Progress value={60} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span>Timeline</span>
                              <span className="font-medium">90%</span>
                            </div>
                            <Progress value={90} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {currentSection === "budget" && (
                    <div className="space-y-4">
                      <p className="text-gray-700">
                        Budget analysis based on your uploaded documents and profile information:
                      </p>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium text-blue-700">Budget Breakdown</h4>
                        <ul className="list-disc list-inside text-gray-700">
                          <li>Production costs appear to be well-justified</li>
                          <li>Marketing allocation seems appropriate for project scope</li>
                          <li>Consider increasing contingency fund (currently estimated at 5%)</li>
                        </ul>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium text-blue-700">Budget Recommendations</h4>
                        <ul className="list-disc list-inside text-gray-700">
                          <li>Include more detailed breakdown of production costs</li>
                          <li>Add quotes from service providers where applicable</li>
                          <li>Clarify in-kind contributions vs. cash expenses</li>
                        </ul>
                      </div>
                      
                      {profile && profile.projectBudget && (
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <h4 className="font-medium text-blue-700 mb-2">Your Budget: ${profile.projectBudget}</h4>
                          <p className="text-sm text-gray-700">
                            For your ${profile.projectType} project with a budget of ${profile.projectBudget}, 
                            we recommend allocating approximately:
                          </p>
                          <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
                            <li>45-50% for direct production costs</li>
                            <li>15-20% for artist/collaborator fees</li>
                            <li>10-15% for marketing and promotion</li>
                            <li>10% for administrative overhead</li>
                            <li>5-10% for contingency</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {currentSection === "keywords" && (
                    <div className="space-y-4">
                      <p className="text-gray-700">
                        Key terms and concepts identified in your documents that align with grant criteria:
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mt-2">
                        {["artistic innovation", "community engagement", "cultural diversity", 
                          "professional development", "audience development", "artistic excellence",
                          "emerging artist", "technological innovation", "collaborative project"].map((term) => (
                          <span key={term} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                            {term}
                          </span>
                        ))}
                      </div>
                      
                      <div className="space-y-2 mt-4">
                        <h4 className="font-medium text-blue-700">Recommended Emphasis</h4>
                        <p className="text-gray-700">
                          Based on your application, we recommend emphasizing these concepts more strongly:
                        </p>
                        <ul className="list-disc list-inside text-gray-700">
                          <li>Cultural significance and impact</li>
                          <li>Innovation in your artistic approach</li>
                          <li>Specific community benefits</li>
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {currentSection === "timeline" && (
                    <div className="space-y-4">
                      <p className="text-gray-700">
                        Timeline analysis based on your uploaded documents:
                      </p>
                      
                      <div className="space-y-4 mt-4">
                        {[
                          { phase: "Pre-Production", duration: "2 months", status: "Detailed" },
                          { phase: "Production", duration: "3 months", status: "Well Defined" },
                          { phase: "Post-Production", duration: "1 month", status: "Needs Detail" },
                          { phase: "Release/Distribution", duration: "Ongoing", status: "Needs Timeline" }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg">
                            <div className="bg-blue-100 p-2 rounded-full">
                              <Clock className="h-4 w-4 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium">{item.phase}</h5>
                              <p className="text-sm text-gray-500">{item.duration}</p>
                            </div>
                            <span className={cn(
                              "text-xs px-2 py-1 rounded-full",
                              item.status === "Detailed" ? "bg-green-100 text-green-700" :
                              item.status === "Well Defined" ? "bg-blue-100 text-blue-700" :
                              "bg-amber-100 text-amber-700"
                            )}>
                              {item.status}
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="space-y-2 mt-4">
                        <h4 className="font-medium text-blue-700">Timeline Recommendations</h4>
                        <ul className="list-disc list-inside text-gray-700">
                          <li>Add specific milestones within each phase</li>
                          <li>Include key decision points and deliverables</li>
                          <li>Consider adding more detail to the post-production phase</li>
                          <li>Define clear metrics for project completion</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="border border-blue-100">
                <CardContent className="pt-6">
                  <div className="text-center p-6 space-y-4">
                    <FileText className="h-12 w-12 text-blue-200 mx-auto" />
                    <h3 className="text-xl font-medium text-gray-700">No Documents Uploaded</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                      Upload your grant-related documents in the chat to receive personalized insights 
                      and recommendations for your application.
                    </p>
                    {profile && (
                      <div className="mt-6 p-4 bg-blue-50 rounded-lg text-left">
                        <h4 className="font-medium text-blue-700 mb-2">Profile Information</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                          {profile.careerStage && <li><span className="font-medium">Career Stage:</span> {profile.careerStage}</li>}
                          {profile.genre && <li><span className="font-medium">Genre:</span> {profile.genre}</li>}
                          {profile.projectType && <li><span className="font-medium">Project Type:</span> {profile.projectType}</li>}
                          {profile.projectBudget && <li><span className="font-medium">Budget:</span> ${profile.projectBudget}</li>}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </ScrollArea>
    </div>
  );
};
