import '../tokens/index.css'
import { StatCardBigText, StatCardGraphic, StatCardBarChart, StatCardSemiCircle, StatCardMarquee, StatCardGrid } from '../components/StatCard'
import globeSvg from './assets/globe.svg'

const countries = ['Sverige', 'Norge', 'Danmark', 'Finland', 'Island', 'Tyskland', 'Frankrike', 'Spanien', 'Japan', 'Brasilien', 'Kanada', 'Australien'];

function App() {
  return (
    <div style={{ padding: '40px var(--outer-x-default)', background: '#f0f0f0', minHeight: '100vh', maxWidth: '1440px', margin: '0 auto' }}>
      <StatCardGrid>
        <StatCardBigText
          title="Administrativ kostnadsprocent"
          description="Adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat."
          bigText="9,5%"
          variant="purple"
          bgVariant="blue"
        />
        <StatCardGraphic
          title="Sverige är en av fyra nettoexportörer globalt"
          description="Adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat."
          graphic={globeSvg}
          graphicAlt="Globe illustration"
          variant="blue"
          bgVariant="blue"
        />
        <StatCardBarChart
          title="Rättighetsintäkter över tid"
          description="Adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat."
          bars={[
            { value: 1.6, displayValue: '1,6', unit: 'mdr', label: '2010' },
            { value: 1.8, displayValue: '1,8', unit: 'mdr', label: '2015' },
            { value: 1.9, displayValue: '1,9', unit: 'mdr', label: '2020' },
            { value: 3.1, displayValue: '3,1', unit: 'mdr', label: '2025' },
          ]}
          variant="purple"
          bgVariant="blue"
        />
        <StatCardSemiCircle
          title="Title goes here"
          description="Adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat."
          segments={[
            { value: 40, label: 'Norge' },
            { value: 25, label: 'USA' },
            { value: 20, label: 'Danmark' },
            { value: 15, label: 'Sverige' },
          ]}
          variant="purple"
          bgVariant="blue"
        />
        <StatCardMarquee
          title="Länder vi samarbetar med"
          description="Adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat."
          items={countries}
          variant="purple"
          bgVariant="blue"
        />
        {/* Placeholder card for grid layout */}
        <StatCardBigText
          title="Placeholder"
          description="Adipisci velit, sed quia non numquam eius modi tempora."
          bigText="42"
          variant="blue"
          bgVariant="blue"
        />
      </StatCardGrid>

      <div className="stat-card-singles" style={{ marginTop: 'var(--space-80)' }}>
        <StatCardBigText
          title="Administrativ kostnadsprocent"
          description="Adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat."
          bigText="9,5%"
          variant="purple"
          bgVariant="blue"
          wide
        />
        <StatCardGraphic
          title="Sverige är en av fyra nettoexportörer globalt"
          description="Adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat."
          graphic={globeSvg}
          graphicAlt="Globe illustration"
          variant="blue"
          bgVariant="blue"
          wide
        />
        <StatCardBarChart
          title="Rättighetsintäkter över tid"
          description="Adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat."
          bars={[
            { value: 1.6, displayValue: '1,6', unit: 'mdr', label: '2010' },
            { value: 1.8, displayValue: '1,8', unit: 'mdr', label: '2015' },
            { value: 1.9, displayValue: '1,9', unit: 'mdr', label: '2020' },
            { value: 3.1, displayValue: '3,1', unit: 'mdr', label: '2025' },
          ]}
          variant="purple"
          bgVariant="blue"
          wide
        />
        <StatCardSemiCircle
          title="Title goes here"
          description="Adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat."
          segments={[
            { value: 40, label: 'Norge' },
            { value: 25, label: 'USA' },
            { value: 20, label: 'Danmark' },
            { value: 15, label: 'Sverige' },
          ]}
          variant="purple"
          bgVariant="blue"
          wide
        />
        <StatCardMarquee
          title="Länder vi samarbetar med"
          description="Adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat."
          items={countries}
          variant="purple"
          bgVariant="blue"
          wide
        />
      </div>
    </div>
  )
}

export default App
