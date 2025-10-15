'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { mlChatbotFlow } from '@/ai/flows/ml-chatbot-flow';
import { useToast } from '@/hooks/use-toast';

type Message = {
  sender: 'user' | 'bot';
  content: string;
};

export function AiGuideChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [apiKey, setApiKey] = useState('sk-or-v1-...'); // Pre-configured placeholder
  const [tempApiKey, setTempApiKey] = useState('');
  const [apiStatus, setApiStatus] = useState({ message: 'API key pre-configured', success: true });

  const addMessage = (sender: 'user' | 'bot', content: string) => {
    setMessages(prev => [...prev, { sender, content }]);
  };

  const handleUserInput = async () => {
    const message = userInput.trim();
    if (message) {
      addMessage('user', message);
      setUserInput('');
      setLoading(true);

      try {
        const response = await mlChatbotFlow({ message });
        addMessage('bot', response.response);
      } catch (error) {
        console.error('API Error:', error);
        toast({
            variant: 'destructive',
            title: 'An error occurred',
            description: 'Sorry, I encountered an error processing your request. Please try again later.',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleUserInput();
    }
  };

  const askQuestion = (question: string) => {
    setUserInput(question);
    // Focus the input to allow the user to send the pre-filled question
    document.getElementById('user-input')?.focus();
  };
  
  const saveApiKey = () => {
      if(tempApiKey.trim()){
        setApiKey(tempApiKey);
        setApiStatus({ message: 'API key saved successfully!', success: true });
      } else {
        setApiStatus({ message: 'Please enter a valid API key.', success: false });
      }
  }

  useEffect(() => {
    // Scroll to the bottom of the chat on new message
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);
  
  useEffect(() => {
    // Initial welcome message
    const welcomeMessage = `
        <div class="message-content">
            <span class="definition">Welcome to your Advanced AI Assistant!</span>
            I'm here to help you with any questions you might have. I can provide detailed explanations, generate content, solve problems, and much more.
            <br><br>
            <span class="example">You can ask me about:</span>
            • Any topic you're curious about<br/>
            • Help with coding or technical questions<br/>
            • Explanations of complex concepts<br/>
            • Creative writing or content generation
            <br><br>
            <span class="tip">For the best experience, consider adding your API key in the sidebar.</span>
        </div>`;
    addMessage('bot', welcomeMessage);
  }, []);

  return (
    <div className="chatbot-container">
        <div className="sidebar">
            <div className="sidebar-header">
                <h2><i className="fas fa-robot"></i> Advanced AI</h2>
                <p>Powered by Advanced AI</p>
            </div>
            <div className="topic-suggestions">
                <h3><i className="fas fa-lightbulb"></i> Popular Topics</h3>
                <div className="topic-grid">
                    <button className="btn btn-secondary" onClick={() => askQuestion('Tell me about artificial intelligence')}><i className="fas fa-brain"></i> AI Overview</button>
                    <button className="btn btn-secondary" onClick={() => askQuestion('Explain machine learning')}><i className="fas fa-cogs"></i> Machine Learning</button>
                    <button className="btn btn-secondary" onClick={() => askQuestion('What is deep learning?')}><i className="fas fa-network-wired"></i> Deep Learning</button>
                    <button className="btn btn-secondary" onClick={() => askQuestion('Explain natural language processing')}><i className="fas fa-language"></i> NLP</button>
                    <button className="btn btn-secondary" onClick={() => askQuestion('How does computer vision work?')}><i className="fas fa-eye"></i> Computer Vision</button>
                    <button className="btn btn-secondary" onClick={() => askQuestion('Tell me about reinforcement learning')}><i className="fas fa-gamepad"></i> Reinforcement Learning</button>
                </div>
            </div>
            
            <div className="api-section">
                <h3><i className="fas fa-key"></i> API Configuration</h3>
                <div className="api-input">
                    <input type="password" id="api-key-input" placeholder="Enter your API key" className="api-key-input" onChange={(e) => setTempApiKey(e.target.value)} />
                    <button id="save-api-key" className="btn btn-small" onClick={saveApiKey}><i className="fas fa-save"></i> Save</button>
                </div>
                <p className={`api-status ${apiStatus.success ? 'success' : 'error'}`}>{apiStatus.message}</p>
            </div>
        </div>
        
        <div className="main-content">
            <div className="chat-header">
                <h1><i className="fas fa-robot"></i> Advanced AI Assistant</h1>
                <span className="header-subtitle">Ask me anything - powered by state-of-the-art AI</span>
            </div>
            
            <div className="chat-messages" id="chat-messages" ref={chatContainerRef}>
              {messages.map((msg, index) => (
                  <div key={index} className={`message ${msg.sender}`}>
                      <div className="message-avatar">
                          <i className={`fas ${msg.sender === 'bot' ? 'fa-robot' : 'fa-user'}`}></i>
                      </div>
                      <div className="message-content" dangerouslySetInnerHTML={{ __html: msg.content }} />
                  </div>
              ))}
              {loading && (
                <div className="typing-indicator" style={{ display: 'flex' }}>
                    <div className="typing-dots">
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                    </div>
                </div>
              )}
            </div>
            
            <div className="chat-input">
                <div className="input-group">
                    <input 
                      type="text" 
                      className="chat-input-field" 
                      id="user-input" 
                      placeholder="Ask me anything..." 
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      disabled={loading}
                    />
                    <button className="btn btn-primary" onClick={handleUserInput} disabled={loading}><i className="fas fa-paper-plane"></i></button>
                </div>
            </div>
        </div>
    </div>
  );
}
