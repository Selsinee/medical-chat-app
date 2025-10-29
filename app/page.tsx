'use client';

import { useState } from "react";

type Sender = 'Doctor' | 'Patient';

type Message = {
  sender: Sender;
  text: string;
};

export default function Home() {

  const [doctorInput, setDoctorInput] = useState('');
  const [patientInput, setPatientInput] = useState('');
  const [medicalRecord, setMedicalRecord] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [conversation, setConversation] = useState<Message[]>([
    { sender: 'Doctor', text: 'What brings you in today?' },
    { sender: 'Patient', text: 'I have fever and cough for 3 days.' },
    { sender: 'Doctor', text: 'How high is the fever?' },
    { sender: 'Patient', text: '38.5°C' },
    { sender: 'Doctor', text: 'Any other symptoms?' },
    { sender: 'Patient', text: 'Yes, body aches and tiredness.' },
    { sender: 'Doctor', text: "I'll prescribe some medication and rest." },
  ]);

  const handleSend = (sender: Sender) => {
    const text = sender === 'Doctor' ? doctorInput : patientInput;
    if (text.trim()) {
      setConversation([...conversation, { sender, text }]);
      if (sender === 'Doctor') {
        setDoctorInput('');
      } else {
        setPatientInput('');
      }
    }
  };

  const handleGenerateRecord = async () => {
    setIsLoading(true);
    setMedicalRecord('');

    const formattedConversation = conversation
      .map((msg) => `${msg.sender}: ${msg.text}`)
      .join('\n');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ conversation: formattedConversation }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate record');
      }

      const data = await response.json();
      console.log(data);
      setMedicalRecord(data.medicalRecord);

    } catch (error) {
      console.error(error);
      alert('Error generating medical record. See console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearConversation = () => {
    setConversation([]);
    setMedicalRecord('');
  };

  return (
    <main className="flex min-h-screen bg-slate-100 font-sans dark:bg-slate-900 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-7xl gap-6 mx-auto">
        <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-slate-800 h-[calc(100vh-3rem)] flex flex-col">
          <h1 className="mb-6 text-center text-3xl font-bold text-slate-700 dark:text-slate-200">
            Consultation
          </h1>

          <div className="mb-4 flex-1 overflow-y-auto rounded border border-slate-200 bg-slate-50 p-4 space-y-2 dark:border-slate-700 dark:bg-slate-700 min-h-0">
            {conversation.map((msg, index) => (
              <div key={index} className="text-sm text-slate-800 dark:text-slate-100">
                <strong
                  className={
                    msg.sender === 'Doctor'
                      ? 'text-teal-700 dark:text-teal-300'
                      : 'text-rose-700 dark:text-rose-300' 
                  }
                >
                  {msg.sender}:
                </strong>{' '}
                {msg.text}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="doctor"
                className="font-semibold text-teal-700 dark:text-teal-300"
              >
                Doctor
              </label>
              <div className="flex gap-2">
                <input
                  id="doctor"
                  type="text"
                  value={doctorInput}
                  onChange={(e) => setDoctorInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend('Doctor')}
                  className="flex-1 min-w-0 rounded border border-slate-300 p-2 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-400"
                  placeholder="Type message..."
                />
                <button
                  onClick={() => handleSend('Doctor')}
                  className="rounded bg-teal-600 px-3 py-2 font-semibold text-white hover:bg-teal-700 text-sm"
                >
                  Send
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="patient"
                className="font-semibold text-rose-700 dark:text-rose-300"
              >
                Patient
              </label>
              <div className="flex gap-2">
                <input
                  id="patient"
                  type="text"
                  value={patientInput}
                  onChange={(e) => setPatientInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend('Patient')}
                  className="flex-1 min-w-0 rounded border border-slate-300 p-2 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-400"
                  placeholder="Type message..."
                />
                <button
                  onClick={() => handleSend('Patient')}
                  className="rounded bg-rose-600 px-3 py-2 font-semibold text-white hover:bg-rose-700 text-sm"
                >
                  Send
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={handleClearConversation}
              disabled={conversation.length === 0}
              className="rounded border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-500 disabled:opacity-50 dark:border-slate-700 dark:text-slate-100"
            >
              Clear Conversation
            </button>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-slate-800 flex flex-col h-[calc(100vh-3rem)]">
          <h2 className="mb-6 text-center text-3xl font-bold text-slate-700 dark:text-slate-200">
            Medical Record
          </h2>
          
          <button
            onClick={handleGenerateRecord}
            disabled={isLoading || conversation.length === 0}
            className="rounded bg-slate-700 px-4 py-3 text-lg font-bold text-white hover:bg-slate-800 disabled:opacity-50 dark:bg-slate-600 dark:hover:bg-slate-500 mb-6"
          >
            {isLoading ? 'Generating...' : medicalRecord ? 'Regenerate Medical Record' : 'Generate Medical Record'}
          </button>

          <div className="flex-1 rounded border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-700">
            {medicalRecord ? (
              // Use <pre> to respect whitespace and newlines from the AI
              <pre className="whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-100">
                {medicalRecord}
              </pre>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-slate-400">
                No medical record generated yet
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
