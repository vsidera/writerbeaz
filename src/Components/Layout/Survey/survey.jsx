// SurveyMonkeyEmbed.jsx

import React, { useEffect } from 'react';

const SurveyMonkeyEmbed = () => {
  useEffect(() => {
    // Embed SurveyMonkey script
    (function(t, e, s, n) {
      var o, a, c;
      t.SMCX = t.SMCX || [];
      if (!e.getElementById(n)) {
        o = e.getElementsByTagName(s);
        a = o[o.length - 1];
        c = e.createElement(s);
        c.type = "text/javascript";
        c.async = !0;
        c.id = n;
        c.src = "https://widget.surveymonkey.com/collect/website/js/tRaiETqnLgj758hTBazgd8bbFQyjNel4QIYvJx5zNMp2dqBm1_2B_2FGo1hB9nN4eML0.js";
        a.parentNode.insertBefore(c, a);
      }
    })(window, document, "script", "smcx-sdk");
  }, []);

  return (
    <div>
      <p style={{font: '12px Helvetica, sans-serif', color: '#999', textDecoration: 'none'}}>
        <a href="https://www.surveymonkey.com">Create your own user feedback survey</a>
      </p>
    </div>
  );
};

export default SurveyMonkeyEmbed;
