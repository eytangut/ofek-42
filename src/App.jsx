import React, { useEffect, useState, useRef } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

function App() {
  // read target date from env var (edit in .env or code)
  const dateStr = import.meta.env.VITE_TARGET_DATE || '2025-07-01T15:00:00';
  // allow dynamic targetDate state
  const [targetDate, setTargetDate] = useState(() => new Date(dateStr));
  // store last fetched remote timestamp for comparison
  const remoteTS = useRef(targetDate.getTime());
  // state for remaining time to display in countdown
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));

  // fetch remote on mount
  useEffect(() => {
    async function syncRemote() {
      const ref = doc(db, 'settings', 'targetDate');
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const rd = new Date(snap.data().value);
        remoteTS.current = rd.getTime();
        if (rd.getTime() !== targetDate.getTime()) {
          setTargetDate(rd);
        }
      }
    }
    syncRemote();
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(timerId);
  }, [targetDate]);

  // on pagehide, sendBeacon to update Firestore if local target is sooner by >1s
  useEffect(() => {
    const handler = () => {
      const now = Date.now();
      const localTL = targetDate.getTime() - now;
      const remoteTL = remoteTS.current - now;
      if (localTL + 1000 < remoteTL) {
        const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
        const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
        const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/settings/targetDate?updateMask.fieldPaths=value&key=${apiKey}`;
        const body = JSON.stringify({ fields: { value: { stringValue: targetDate.toISOString() } } });
        if (navigator.sendBeacon) {
          navigator.sendBeacon(url, new Blob([body], { type: 'application/json' }));
        } else {
          fetch(url, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body, keepalive: true });
        }
      }
    };
    window.addEventListener('pagehide', handler);
    return () => window.removeEventListener('pagehide', handler);
  }, [targetDate]);

  // calculate days, hours, minutes, seconds remaining
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

  // subtract one minute locally; remote update handled on unload
  const subtractMinute = () => {
    const newDate = new Date(targetDate.getTime() - 60000);
    setTargetDate(newDate);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-10">
      <div className="w-full max-w-lg bg-white rounded-xl p-6">
        <div className="flex flex-col items-center">
          {/* subtract one minute button */}
          <button onClick={subtractMinute} className="btn btn-error mb-6">
            הפחת 1 דקה
          </button>
          {/* greeting and instructions */}
          <p className="mb-6 text-base text-gray-700">
            אה, שלום לכם. אז נכנסתם לקישור. יפה מאוד, זה השלב הראשון. לצערנו, תיאלצו להמתין עכשיו בסבלנות,
            עד הראשון לחודש יולי. אל תשכחו! תיכנסו בראשון ליולי, או בתאריך אחר בשבוע הראשון של יולי, לאתר הזה.
            אני אחכה לכם.
          </p>
          {/* countdown display using daisyUI countdown */}
          {timeLeft ? (
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="text-center">
                <div className="countdown font-mono text-4xl">
                  <span style={{ '--value': timeLeft.days }}></span>
                </div>
                <div className="text-sm text-gray-500">ימים</div>
              </div>
              <div className="text-center">
                <div className="countdown font-mono text-4xl">
                  <span style={{ '--value': timeLeft.hours }}></span>
                </div>
                <div className="text-sm text-gray-500">שעות</div>
              </div>
              <div className="text-center">
                <div className="countdown font-mono text-4xl">
                  <span style={{ '--value': timeLeft.minutes }}></span>
                </div>
                <div className="text-sm text-gray-500">דקות</div>
              </div>
              <div className="text-center">
                <div className="countdown font-mono text-4xl">
                  <span style={{ '--value': timeLeft.seconds }}></span>
                </div>
                <div className="text-sm text-gray-500">שניות</div>
              </div>
            </div>
          ) : (
            <p className="text-xl font-bold">היום!!! או שזה בכלל בעבר?</p>
          )}
          {/* version marker */}
          <div className="mt-8 text-xs text-gray-400">Version 1.1</div>
        </div>
      </div>
    </div>
  );
}

export default App;
