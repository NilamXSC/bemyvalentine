import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Copy, Check, Send, Sparkles } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { generateShareLink } from '@/lib/share-utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ShareLinkModalProps {
  open: boolean;
  onClose: () => void;
}

const ShareLinkModal = ({ open, onClose }: ShareLinkModalProps) => {
  const { user } = useUser();
  const [copied, setCopied] = useState(false);
  const [shareLink, setShareLink] = useState('');

  useEffect(() => {
    if (user && open) {
      const link = generateShareLink(
        {
          hisName: user.hisName,
          herName: user.herName,
          hisNickname: user.hisNickname,
          herNickname: user.herNickname,
        },
        window.location.origin
      );
      setShareLink(link);
    }
  }, [user, open]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsAppShare = () => {
    const message = encodeURIComponent(
      `Hey ${user?.herName || 'babe'}! 💖 I made something special for you... Click this link to see! ${shareLink}`
    );
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md glass-card border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-center font-serif text-xl sm:text-2xl text-foreground flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Your Special Link is Ready!
            <Sparkles className="w-5 h-5 text-primary" />
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Send this magical link to {user?.herName || 'your special someone'} 💕
          </DialogDescription>
        </DialogHeader>

        <div className="pt-4 space-y-6">
          {/* Animated heart */}
          <motion.div
            className="flex justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Heart className="w-12 h-12 text-primary" fill="currentColor" />
          </motion.div>

          {/* Link display */}
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                value={shareLink}
                readOnly
                className="bg-background/50 border-primary/20 text-sm font-mono"
              />
              <Button
                onClick={handleCopy}
                variant="outline"
                size="icon"
                className="shrink-0 border-primary/20 hover:bg-primary/5"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-primary" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>

            {copied && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-sm text-primary font-medium"
              >
                Copied to clipboard! 💖
              </motion.p>
            )}
          </div>

          {/* Share buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleWhatsAppShare}
              className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full py-6 font-semibold flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Share via WhatsApp
            </Button>

            <Button
              onClick={onClose}
              variant="outline"
              className="w-full rounded-full py-6 border-primary/30 hover:bg-primary/5"
            >
              I'll share it my own way
            </Button>
          </div>

          {/* Tips */}
          <div className="text-center text-xs text-muted-foreground space-y-1">
            <p>💡 When they click the link, they'll see your personalized Valentine experience!</p>
            <p>The link includes your names and nicknames for a special touch.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareLinkModal;
