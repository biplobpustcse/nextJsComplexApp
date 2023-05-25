import React from 'react'

function Direction({item}) {
    console.log('direction',item)
  return (
    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
    <div class="ingredient-description">
      <div class="common-fieldset-main">
        <fieldset class="common-fieldset">
          <legend class="rounded">direction</legend>
          {item !="" && ( <div class="step" dangerouslySetInnerHTML={{__html: item}} />)}
         
        </fieldset>
      </div>
    </div>
  </div>
  )
}

export default Direction