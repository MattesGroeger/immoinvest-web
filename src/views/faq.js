import React from 'react'
import { Link } from 'react-router'
import { Row, Col, Panel } from 'react-bootstrap'

export default class World extends React.Component {
  render() {
    return (
      <Row>
        <Col xs={18} md={12}>
          <Panel header="Warum gibt es dieses Projekt?">
            <p>Ich habe mich intensiv mit der Möglichkeit eine Immobilie als Kapitalanlage zu erwerben beschäftigt. Ich denke es ist langfristig sinnvoll seine Anlageklassen zu diversifizieren.</p>
            <p>Im Rahmen meiner Recherche begann ich mir eine Excel-Tabelle zu erarbeiten. Damit ließ sich die Rentabilität einer Immobilie ausrechnen und mit anderen Anlagestrategien vergleichen. Auch konnte ich verschiedene Szenarien durchspielen.</p>
            <p>Recht bald stieß ich jedoch mit Excel an Grenzen denn ich wollte sehen können welche Parameter sich wie stark auf die Gesamtrendite auswirken (in Echtzeit). Dies war der Startschuß für dieses Projekt.</p>
            <p>Mithilfe modernster Web-Technologie möchte ich es jedem ermöglichen eine Anlageentscheidung anhand von Fakten und Simulationen treffen zu können. Solch langfristige Geldanlagen wollen gut überlegt sein.</p>
          </Panel>
          <Panel header="Wie kann ich eine 100% oder 120% Finanzierung berechnen?">
            <p>Dazu im Panel <em>Finanzierung</em> bei Eigenkapital 0 € eintragen. Die Prozentzahl wird dadurch negativ und die Nebenkosten gehen mit in die Darlehenssumme ein.</p>
          </Panel>
          <Panel header="Mir fehlt folgende Funktionalität...">
            <p>Sicherlich werden Ihnen Funktionen fehlen oder noch nicht optimal funktionieren. Das Projekt steht noch ganz am Anfang und wird kontinuierlich weiter entwickelt.</p>
            <p>Bitte schreiben Sie Ihren Verbesserungsvorschlag an <a href="mailto:immoinvest@mattes-groeger.de">immoinvest@mattes-groeger.de</a>. Ich freue mich auf Ihr Feedback.</p>
          </Panel>
        </Col>
      </Row>
    )
  }
}
