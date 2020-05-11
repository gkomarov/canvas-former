import React from 'react';

import LetterCanvas from './LetterCanvas';
export default class LetterLayer extends React.Component {
    render(){
        return (
            <div>
                <h1>Canvas Former</h1>
                    {/* Canvas width and height should come from backend. 595 and 842 just a default size */}
                    <LetterCanvas
                        canvasWidth={595}
                        canvasHeight={842}
                    />
            </div>
        )
    }
}
