
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Award, CheckCircle2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SectionTemplate } from "./SectionTemplate";

type Section = {
  id: string;
  title: string;
  icon: React.ReactNode;
};

type FormSectionCardProps = {
  section: Section;
  advice: string;
  hasSuccessInsights: boolean;
  relevantFactors: string[];
};

// Sample application templates for different sections
const sampleTemplates = {
  "project-summary": [
    {
      id: "ps1",
      quality: "excellent",
      title: "Concise & Impactful",
      content: "The 'Toronto Music Mentorship Initiative' will connect 25 emerging musicians from underrepresented communities with established industry professionals for six months of structured mentorship. Through bi-weekly sessions, collaborative workshops, and a culminating showcase event, participants will develop artistic skills, industry knowledge, and sustainable career strategies. This $45,000 grant will fund mentor stipends, venue costs, recording sessions, and marketing materials, directly addressing the lack of accessible industry guidance for diverse artists in Toronto's music ecosystem.",
      tags: ["mentorship", "diversity"]
    },
    {
      id: "ps2",
      quality: "good",
      title: "Detail-Oriented",
      content: "Our project, 'Sonic Futures,' is a 12-month professional development program for 15 emerging electronic music producers from Toronto's diverse communities. The program includes monthly masterclasses with industry leaders, access to studio equipment, collaborative opportunities, and culminates in a professionally produced compilation album and release event. With a budget of $30,000, we will provide crucial resources, mentorship, and exposure to artists who face significant barriers to career advancement in Toronto's competitive music industry.",
      tags: ["electronic", "production"]
    }
  ],
  "artist-background": [
    {
      id: "ab1",
      quality: "excellent",
      title: "Achievement-Focused",
      content: "Since forming in 2019, Nova Collective has established a reputation as one of Toronto's most innovative jazz ensembles. Our debut EP reached #3 on the Canadian Jazz charts and garnered 150,000+ streams across platforms. We've performed at six major festivals including TD Toronto Jazz Festival (2022) and received media coverage from CBC Music, JazzFM, and NOW Toronto. In 2021, we successfully completed a FACTOR-funded recording project, delivering all expected outcomes on time and within budget. Our audience has grown 200% year-over-year, with particularly strong engagement among 25-45 year-old urban professionals.",
      tags: ["jazz", "ensemble"]
    },
    {
      id: "ab2",
      quality: "good",
      title: "Growth-Oriented",
      content: "As an emerging hip-hop artist, I've released two independent EPs that have generated over 75,000 streams. My single 'City Lights' was featured on Spotify's Canadian Fresh Finds playlist, leading to 30,000+ streams and growing my social media following to 5,000+ engaged fans. I've performed at 15+ venues across the GTA and opened for established acts at The Mod Club and The Garrison. My recent collaboration with producer J-Track received radio play on Flow 93.5 and was covered by HipHopCanada. In 2022, I completed a digital marketing course to better promote my work, resulting in a 70% increase in audience engagement.",
      tags: ["hip-hop", "solo"]
    }
  ],
  "project-timeline": [
    {
      id: "pt1",
      quality: "excellent",
      title: "Detailed Monthly",
      content: "Month 1-2: Pre-production phase\n• Finalize song selection (Month 1, Week 1-2)\n• Arrange studio musicians and rehearsal space (Month 1, Week 3-4)\n• Conduct 4 full-band rehearsals (Month 2, Weeks 1-4)\n• Finalize arrangements and production approach (Month 2, Week 4)\n\nMonths 3-4: Recording phase\n• Record rhythm section tracks at Revolution Recording (4 days, Month 3, Week 1)\n• Record vocal tracks (3 days, Month 3, Week 3)\n• Record horn and string overdubs (2 days, Month 4, Week 1)\n• Complete additional overdubs and fixes (2 days, Month 4, Week 2-3)\n\nMonths 5-6: Post-production phase\n• Mixing with engineer Sarah Johnson (Month 5, Weeks 1-3)\n• Revisions and final mix approval (Month 5, Week 4)\n• Mastering with engineer Michael Thomas (Month 6, Week 1)\n• Prepare release assets, artwork, and press kit (Month 6, Weeks 2-3)\n• Submit all deliverables to distributor (Month 6, Week 4)",
      tags: ["recording", "album"]
    },
    {
      id: "pt2",
      quality: "good",
      title: "Quarterly Planning",
      content: "Q1 (January-March 2023): Development Phase\n• January: Complete demo recordings of all 8 songs\n• February: Conduct artist research and outreach to potential collaborators\n• March: Secure all production personnel and finalize project scope\n\nQ2 (April-June 2023): Production Phase\n• April: Complete pre-production and rehearsals\n• May: 7-day intensive recording session at Dreamhouse Studios\n• June: Complete all overdubs and additional recording\n\nQ3 (July-September 2023): Post-Production Phase\n• July: Mixing process with engineer\n• August: Mastering and album art finalization\n• September: Prepare all release materials and marketing plan\n\nQ4 (October-December 2023): Release Phase\n• October: Submit to distributor and begin PR campaign\n• November: Album release and launch event\n• December: Performance at winter showcase and evaluate project outcomes",
      tags: ["quarterly", "planning"]
    }
  ],
  "budget": [
    {
      id: "b1",
      quality: "excellent",
      title: "Detailed Breakdown",
      content: "PERSONNEL COSTS - $18,750\n• Producer (15 days @ $500/day): $7,500\n• Recording engineer (8 days @ $450/day): $3,600\n• Mixing engineer (5 days @ $600/day): $3,000\n• Session musicians (5 musicians, 3 days @ $300/day): $4,500\n• Mastering engineer (flat fee): $1,500\n\nSTUDIO COSTS - $8,400\n• Studio A rental (8 days @ $800/day): $6,400\n• Editing suite (4 days @ $250/day): $1,000\n• Equipment rentals (vintage mics, amps): $1,000\n\nPRODUCTION COSTS - $5,850\n• Graphic design for album artwork: $1,200\n• Photography session: $800\n• Music video production (1 video): $3,000\n• Manufacturing (300 vinyl records): $2,100\n\nMARKETING & PROMOTION - $4,000\n• PR campaign (2 months): $2,500\n• Social media advertising: $1,000\n• Release event costs: $500\n\nTOTAL PROJECT COST: $37,000\n\nFUNDING SOURCES:\n• Requested grant: $25,000 (67.6%)\n• Artist contribution: $7,000 (18.9%)\n• Label contribution: $5,000 (13.5%)\n\nNote: All rates are based on industry standards and quotes received from service providers. The artist contribution comes from performance revenues, and the label contribution has been confirmed in writing.",
      tags: ["detailed", "recording"]
    },
    {
      id: "b2",
      quality: "good",
      title: "Categorized Budget",
      content: "ARTIST FEES - $12,000\n• Lead artist (myself): $5,000\n• Collaborating artists (3 @ $1,500 each): $4,500\n• Session musicians (5 @ $500 each): $2,500\n\nPRODUCTION COSTS - $9,500\n• Studio rental (5 days): $4,000\n• Engineer fees: $2,500\n• Mixing and mastering: $3,000\n\nMARKETING & DISTRIBUTION - $5,500\n• Graphic design: $800\n• Photography: $700\n• Digital distribution: $500\n• PR campaign: $2,000\n• Online advertising: $1,500\n\nTOUR SUPPORT - $8,000\n• Transportation (van rental, gas): $3,000\n• Accommodations (8 nights): $2,000\n• Per diems: $1,500\n• Backline rental: $1,500\n\nTOTAL PROJECT BUDGET: $35,000\n\nFUNDING SOURCES:\n• This grant request: $20,000\n• Personal investment: $5,000\n• Crowdfunding campaign: $5,000\n• Venue guarantees: $5,000",
      tags: ["touring", "album"]
    }
  ],
  "impact": [
    {
      id: "i1",
      quality: "excellent",
      title: "Community-Focused",
      content: "This project will create substantial impact across three key dimensions:\n\nARTISTIC IMPACT: The collaboration between traditional Indigenous musicians and contemporary electronic producers will create a groundbreaking fusion style that documents and preserves cultural knowledge while making it accessible to younger audiences. The five resulting tracks will represent an innovative contribution to Canadian music that has potential for national recognition.\n\nCOMMUNITY IMPACT: Through our partnership with Native Canadian Centre of Toronto, we will engage 150+ Indigenous youth in free workshops demonstrating how traditional music can be honored and reimagined using modern technology. Additionally, the project will employ 8 Indigenous artists, providing fair compensation and professional development. The culminating performance at Harbourfront Centre will reach an audience of approximately 800 people, with digital content extending this reach to 10,000+.\n\nCAREER IMPACT: This collaboration will significantly advance my artistic practice by providing new technical skills in digital production while deepening my understanding of Indigenous musical traditions. The resulting work will be submitted to 5+ festivals including imagineNATIVE and will strengthen my professional network within both Indigenous and electronic music communities. The documentation produced will strengthen future grant applications and booking opportunities.",
      tags: ["indigenous", "electronic"]
    },
    {
      id: "i2",
      quality: "good",
      title: "Career-Oriented",
      content: "Professional Impact:\nThis recording project represents a critical next step in my career development, allowing me to create a professional-quality EP that showcases my artistic growth. Working with established producer Sarah Johnson will provide valuable mentorship and significantly elevate the production quality of my work. The resulting EP will serve as a essential tool for booking agents, festival programmers, and media outlets, directly addressing the current gap in my professional materials.\n\nAudience Development:\nThrough this project, I will expand my audience in three specific ways:\n1. The release concert at The Great Hall will reach 200+ attendees\n2. The targeted PR campaign will secure coverage in at least 3 major music publications\n3. The strategic digital marketing plan will increase my streaming audience by an estimated 30% (based on results from previous singles)\n\nCommunity Contribution:\nBy documenting the experiences of newcomer musicians in Toronto, this project contributes important perspectives to the Canadian music narrative. The panel discussion event will create meaningful dialogue between established Canadian artists and emerging immigrant musicians, fostering greater understanding and potential collaborations.",
      tags: ["recording", "career"]
    }
  ]
};

export const FormSectionCard = ({ section, advice, hasSuccessInsights, relevantFactors }: FormSectionCardProps) => {
  const [activeTab, setActiveTab] = useState<string>("advice");
  const [showTemplates, setShowTemplates] = useState<boolean>(false);

  const getTemplates = () => {
    return sampleTemplates[section.id as keyof typeof sampleTemplates] || [];
  };

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-100 p-2 rounded-full">
              {section.icon}
            </div>
            <CardTitle>{section.title}</CardTitle>
          </div>

          {hasSuccessInsights && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <Award className="h-3 w-3 mr-1" />
              Success Insights
            </Badge>
          )}
        </div>
        <CardDescription>
          Recommendations for this section of your application
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="advice" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="advice" className="flex items-center gap-1">
              <Info className="h-3 w-3" />
              Advice
            </TabsTrigger>
            {hasSuccessInsights && relevantFactors.length > 0 && (
              <TabsTrigger value="success-factors" className="flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Success Factors
              </TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="advice">
            <div className="whitespace-pre-wrap text-sm" dangerouslySetInnerHTML={{ __html: advice }} />
            
            {getTemplates().length > 0 && !showTemplates && (
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowTemplates(true)}
                  className="w-full"
                >
                  View Sample Templates
                </Button>
              </div>
            )}
            
            {showTemplates && (
              <SectionTemplate 
                sectionId={section.id}
                title={section.title}
                templates={getTemplates()}
              />
            )}
          </TabsContent>
          
          {hasSuccessInsights && (
            <TabsContent value="success-factors">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground mb-2">
                  These factors appear frequently in successful grant applications:
                </p>
                {relevantFactors.map((factor, index) => (
                  <div key={index} className="flex items-start gap-2 pb-2 border-b last:border-0 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <p>{factor}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
};
