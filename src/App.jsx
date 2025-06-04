import React, { useEffect, useState } from 'react';

function App() {
  const targetDate = new Date('July 5, 2025 15:00:00');
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timerId);
  }, [targetDate]);

  function getTimeLeft(date) {
    const now = new Date();
    const diff = date - now;
    if (diff <= 0) {
      return null;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { days, hours, minutes, seconds };
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <p className="text-lg">אה, שלום לכם. אז נכנסתם לקישור. יפה מאוד, זה השלב הראשון. לצערנו, תיאלצו להמתין עכשיו בסבלנות, עד הראשון לחודש יולי. אל תשכחו! תיכנסו בראשון ליולי, או בתאריך אחר בשבוע הראשון של יולי, לאתר הזה. אני אחכה לכם.</p>
      {timeLeft ? (
        <p className="mt-4 text-2xl font-bold">
          {timeLeft.days} ימים {timeLeft.hours} שעות {timeLeft.minutes} דקות {timeLeft.seconds} שניות
        </p>
      ) : (
        <p className="mt-4 text-2xl font-bold">היום!!! או שזה בכלל בעבר?</p>
      )}
    </div>
  );
}

export default App;
