import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ShareModal = ({ internship, isOpen, onClose }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const shareUrl = `${window.location?.origin}/internship/${internship?.id}`;
  const shareText = `Check out this internship opportunity: ${internship?.title} at ${internship?.company}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard?.writeText(shareUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const handleSocialShare = (platform) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(shareText);
    
    const urls = {
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    };

    if (urls?.[platform]) {
      window.open(urls?.[platform], '_blank', 'width=600,height=400');
    }
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(`Internship Opportunity: ${internship?.title}`);
    const body = encodeURIComponent(`Hi,\n\nI found this internship opportunity that might interest you:\n\n${internship?.title} at ${internship?.company}\nLocation: ${internship?.location}\nDuration: ${internship?.duration}\n\n${message}\n\nCheck it out: ${shareUrl}\n\nBest regards`);
    
    if (email) {
      window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank');
    } else {
      window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
    }
  };

  const socialPlatforms = [
    { name: 'WhatsApp', icon: 'MessageCircle', color: 'text-green-600', key: 'whatsapp' },
    { name: 'Telegram', icon: 'Send', color: 'text-blue-500', key: 'telegram' },
    { name: 'Twitter', icon: 'Twitter', color: 'text-blue-400', key: 'twitter' },
    { name: 'LinkedIn', icon: 'Linkedin', color: 'text-blue-700', key: 'linkedin' },
    { name: 'Facebook', icon: 'Facebook', color: 'text-blue-600', key: 'facebook' }
  ];

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-modal w-full max-w-md animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-card-foreground">
            Share Internship
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-md transition-colors duration-200"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Internship Preview */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-medium text-card-foreground mb-1">
              {internship?.title}
            </h4>
            <p className="text-sm text-muted-foreground">
              {internship?.company} • {internship?.location}
            </p>
          </div>

          {/* Copy Link */}
          <div>
            <label className="text-sm font-medium text-card-foreground mb-2 block">
              Share Link
            </label>
            <div className="flex space-x-2">
              <Input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 text-sm"
              />
              <Button
                variant={copySuccess ? "success" : "outline"}
                size="sm"
                onClick={handleCopyLink}
                iconName={copySuccess ? "Check" : "Copy"}
              >
                {copySuccess ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>

          {/* Social Media Sharing */}
          <div>
            <label className="text-sm font-medium text-card-foreground mb-3 block">
              Share on Social Media
            </label>
            <div className="grid grid-cols-5 gap-3">
              {socialPlatforms?.map((platform) => (
                <button
                  key={platform?.key}
                  onClick={() => handleSocialShare(platform?.key)}
                  className="flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-muted transition-colors duration-200"
                  title={`Share on ${platform?.name}`}
                >
                  <Icon 
                    name={platform?.icon} 
                    size={24} 
                    className={platform?.color}
                  />
                  <span className="text-xs text-muted-foreground">
                    {platform?.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Email Sharing */}
          <div>
            <label className="text-sm font-medium text-card-foreground mb-2 block">
              Share via Email
            </label>
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Recipient's email (optional)"
                value={email}
                onChange={(e) => setEmail(e?.target?.value)}
              />
              <Input
                type="text"
                placeholder="Add a personal message (optional)"
                value={message}
                onChange={(e) => setMessage(e?.target?.value)}
              />
              <Button
                variant="outline"
                onClick={handleEmailShare}
                iconName="Mail"
                iconPosition="left"
                fullWidth
              >
                Send Email
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;