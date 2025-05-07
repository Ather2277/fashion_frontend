
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Info } from 'lucide-react';

export function TipsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Info className="h-4 w-4" />
          Tips
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tips for Great Designs</DialogTitle>
          <DialogDescription>
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="font-medium">Be Specific</h3>
                <p className="text-sm text-gray-500">The more details you provide, the better results you'll get.</p>
              </div>
              <div>
                <h3 className="font-medium">Mention Colors and Materials</h3>
                <p className="text-sm text-gray-500">Describe fabrics, textures, and color schemes.</p>
              </div>
              <div>
                <h3 className="font-medium">Include Style References</h3>
                <p className="text-sm text-gray-500">Mention design inspiration or fashion eras.</p>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
