import React, { useState } from 'react'
import { Button, Collapse } from 'react-bootstrap'
function HideShow() {
  const [isVisible, initHs] = useState(false)
  const invokeCollapse = () => {
    return initHs(!isVisible)
  }
  return (
    <div>
      <h2 className="mb-2">React Hide and Show Collapse Panel Example</h2>
      <Button variant="success" className="mb-4" onClick={invokeCollapse}>
        Show Panel
      </Button>
      <Collapse in={isVisible}>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a
            dignissim nisl. Sed sed mauris elit. Ut efficitur scelerisque
            facilisis. Cras consectetur leo mauris, et interdum lectus hendrerit
            eu.
          </div>
      </Collapse>
    </div>
  )
}
export default HideShow