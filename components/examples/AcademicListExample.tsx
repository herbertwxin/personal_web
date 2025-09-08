// import React from 'react' // Removed unused import
import { AcademicList } from '../ui/academic-list'
import { AcademicContainer, AcademicPageHeader, AcademicContentSection } from '../ui/academic-container'
import { Button } from '../ui/button'
import { ExternalLink, Download, Quote } from 'lucide-react'

export function AcademicListExample() {
  return (
    <AcademicContainer maxWidth="lg" padding="md">
      <AcademicPageHeader 
        title="Academic List Components Demo"
        subtitle="Responsive academic list layouts with proper typography and spacing"
      />
      
      <AcademicContentSection spacing="normal">
        {/* Publications Example */}
        <AcademicList variant="default">
          <AcademicList.SectionHeader>2024 Publications</AcademicList.SectionHeader>
          
          <AcademicList.Item>
            <AcademicList.ItemTitle>
              Dynamic Equilibrium Models in Modern Macroeconomics: A Comprehensive Survey
            </AcademicList.ItemTitle>
            <AcademicList.ItemContent>
              <AcademicList.ItemMetadata>
                <AcademicList.InlineMetadata>Your Name, Co-Author A, Co-Author B</AcademicList.InlineMetadata>
                <AcademicList.InlineMetadata>Journal of Economic Theory</AcademicList.InlineMetadata>
                <AcademicList.InlineMetadata>Vol. 45, No. 3, pp. 123-156</AcademicList.InlineMetadata>
                <AcademicList.Badge>Published</AcademicList.Badge>
                <AcademicList.Badge>Peer Reviewed</AcademicList.Badge>
              </AcademicList.ItemMetadata>
              <p className="text-sm text-muted-foreground mt-2">
                This paper provides a comprehensive survey of dynamic equilibrium models used in modern macroeconomics, 
                analyzing their theoretical foundations and empirical applications across various economic scenarios.
              </p>
            </AcademicList.ItemContent>
            <AcademicList.ItemActions>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" size="sm">
                <Quote className="w-4 h-4 mr-2" />
                Cite
              </Button>
              <Button variant="outline" size="sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                DOI
              </Button>
            </AcademicList.ItemActions>
          </AcademicList.Item>

          <AcademicList.Item>
            <AcademicList.ItemTitle>
              Monetary Policy Transmission Mechanisms in Emerging Markets
            </AcademicList.ItemTitle>
            <AcademicList.ItemContent>
              <AcademicList.ItemMetadata>
                <AcademicList.InlineMetadata>Your Name, International Collaborator</AcademicList.InlineMetadata>
                <AcademicList.InlineMetadata>Economic Policy Review</AcademicList.InlineMetadata>
                <AcademicList.InlineMetadata>Vol. 28, No. 2, pp. 45-78</AcademicList.InlineMetadata>
                <AcademicList.Badge>Under Review</AcademicList.Badge>
              </AcademicList.ItemMetadata>
              <p className="text-sm text-muted-foreground mt-2">
                An empirical analysis of how monetary policy decisions affect economic outcomes in emerging market economies, 
                with particular focus on transmission channels and policy effectiveness.
              </p>
            </AcademicList.ItemContent>
            <AcademicList.ItemActions>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download Draft
              </Button>
              <Button variant="outline" size="sm">
                <Quote className="w-4 h-4 mr-2" />
                Cite
              </Button>
            </AcademicList.ItemActions>
          </AcademicList.Item>

          <AcademicList.SectionHeader>2023 Publications</AcademicList.SectionHeader>
          
          <AcademicList.Item>
            <AcademicList.ItemTitle>
              Financial Market Integration and Economic Growth: Evidence from Panel Data
            </AcademicList.ItemTitle>
            <AcademicList.ItemContent>
              <AcademicList.ItemMetadata>
                <AcademicList.InlineMetadata>Your Name, Research Team</AcademicList.InlineMetadata>
                <AcademicList.InlineMetadata>International Economic Review</AcademicList.InlineMetadata>
                <AcademicList.InlineMetadata>Vol. 64, No. 4, pp. 1123-1156</AcademicList.InlineMetadata>
                <AcademicList.Badge>Published</AcademicList.Badge>
                <AcademicList.Badge>High Impact</AcademicList.Badge>
              </AcademicList.ItemMetadata>
              <p className="text-sm text-muted-foreground mt-2">
                Using panel data from 45 countries over two decades, this study examines the relationship between 
                financial market integration and long-term economic growth patterns.
              </p>
            </AcademicList.ItemContent>
            <AcademicList.ItemActions>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" size="sm">
                <Quote className="w-4 h-4 mr-2" />
                Cite
              </Button>
              <Button variant="outline" size="sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                DOI
              </Button>
            </AcademicList.ItemActions>
          </AcademicList.Item>
        </AcademicList>

        {/* Teaching Example */}
        <AcademicList variant="default">
          <AcademicList.SectionHeader>Current Courses</AcademicList.SectionHeader>
          
          <AcademicList.Item>
            <AcademicList.ItemTitle>
              ECON 301: Intermediate Macroeconomics
            </AcademicList.ItemTitle>
            <AcademicList.ItemContent>
              <AcademicList.ItemMetadata>
                <AcademicList.InlineMetadata>Fall 2024</AcademicList.InlineMetadata>
                <AcademicList.InlineMetadata>Undergraduate</AcademicList.InlineMetadata>
                <AcademicList.InlineMetadata>3 Credits</AcademicList.InlineMetadata>
                <AcademicList.Badge>In Progress</AcademicList.Badge>
              </AcademicList.ItemMetadata>
              <p className="text-sm text-muted-foreground mt-2">
                Comprehensive study of macroeconomic theory and policy, covering topics such as economic growth, 
                unemployment, inflation, and monetary and fiscal policy.
              </p>
              <AcademicList.NestedList>
                <div className="academic-nested-list-item">
                  <strong>Course Materials:</strong> 24 lectures, 12 problem sets, 3 exams
                </div>
                <div className="academic-nested-list-item">
                  <strong>Topics:</strong> DSGE Models, Monetary Policy, Fiscal Policy, Business Cycles
                </div>
                <div className="academic-nested-list-item">
                  <strong>Prerequisites:</strong> ECON 201, MATH 151
                </div>
              </AcademicList.NestedList>
            </AcademicList.ItemContent>
            <AcademicList.ItemActions>
              <Button variant="outline" size="sm">
                View Syllabus
              </Button>
              <Button variant="outline" size="sm">
                Course Materials
              </Button>
            </AcademicList.ItemActions>
          </AcademicList.Item>

          <AcademicList.Item>
            <AcademicList.ItemTitle>
              ECON 501: Advanced Econometrics
            </AcademicList.ItemTitle>
            <AcademicList.ItemContent>
              <AcademicList.ItemMetadata>
                <AcademicList.InlineMetadata>Fall 2024</AcademicList.InlineMetadata>
                <AcademicList.InlineMetadata>Graduate</AcademicList.InlineMetadata>
                <AcademicList.InlineMetadata>4 Credits</AcademicList.InlineMetadata>
                <AcademicList.Badge>In Progress</AcademicList.Badge>
              </AcademicList.ItemMetadata>
              <p className="text-sm text-muted-foreground mt-2">
                Advanced econometric methods for empirical research, including panel data methods, 
                instrumental variables, and time series analysis.
              </p>
              <AcademicList.NestedList>
                <div className="academic-nested-list-item">
                  <strong>Course Materials:</strong> 16 lectures, 8 problem sets, 1 research project
                </div>
                <div className="academic-nested-list-item">
                  <strong>Topics:</strong> Panel Data, IV Estimation, Time Series, Causal Inference
                </div>
                <div className="academic-nested-list-item">
                  <strong>Prerequisites:</strong> ECON 401, STAT 301
                </div>
              </AcademicList.NestedList>
            </AcademicList.ItemContent>
            <AcademicList.ItemActions>
              <Button variant="outline" size="sm">
                View Syllabus
              </Button>
              <Button variant="outline" size="sm">
                Course Materials
              </Button>
            </AcademicList.ItemActions>
          </AcademicList.Item>
        </AcademicList>

        {/* Compact Variant Example */}
        <AcademicList variant="compact">
          <AcademicList.SectionHeader>Recent Blog Posts</AcademicList.SectionHeader>
          
          <AcademicList.Item>
            <AcademicList.ItemTitle>
              Understanding DSGE Models in Modern Economics
            </AcademicList.ItemTitle>
            <AcademicList.ItemContent>
              <AcademicList.ItemMetadata>
                <AcademicList.InlineMetadata>February 15, 2024</AcademicList.InlineMetadata>
                <AcademicList.InlineMetadata>8 min read</AcademicList.InlineMetadata>
                <AcademicList.Badge>Featured</AcademicList.Badge>
              </AcademicList.ItemMetadata>
            </AcademicList.ItemContent>
          </AcademicList.Item>

          <AcademicList.Item>
            <AcademicList.ItemTitle>
              The Role of Central Banks in Financial Stability
            </AcademicList.ItemTitle>
            <AcademicList.ItemContent>
              <AcademicList.ItemMetadata>
                <AcademicList.InlineMetadata>January 28, 2024</AcademicList.InlineMetadata>
                <AcademicList.InlineMetadata>12 min read</AcademicList.InlineMetadata>
              </AcademicList.ItemMetadata>
            </AcademicList.ItemContent>
          </AcademicList.Item>

          <AcademicList.Item>
            <AcademicList.ItemTitle>
              Inflation Targeting: Lessons from Two Decades
            </AcademicList.ItemTitle>
            <AcademicList.ItemContent>
              <AcademicList.ItemMetadata>
                <AcademicList.InlineMetadata>January 10, 2024</AcademicList.InlineMetadata>
                <AcademicList.InlineMetadata>15 min read</AcademicList.InlineMetadata>
              </AcademicList.ItemMetadata>
            </AcademicList.ItemContent>
          </AcademicList.Item>
        </AcademicList>
      </AcademicContentSection>
    </AcademicContainer>
  )
}