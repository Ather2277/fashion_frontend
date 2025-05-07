
import { Switch } from "@/components/ui/switch";
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import { Settings, Lock, Sparkles, Check } from 'lucide-react';

interface AdvancedSettingsProps {
  enableModels: boolean;
  setEnableModels: (enableModels: boolean) => void;
}

export function AdvancedSettings({ enableModels, setEnableModels }: AdvancedSettingsProps) {
  return (
    <Card className="bg-white shadow-sm border-gray-200">
      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            Advanced Settings
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm">Use AI Models</Label>
                <p className="text-xs text-gray-500">Add models to your designs</p>
              </div>
              <Switch 
                checked={enableModels} 
                onCheckedChange={setEnableModels} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm">High Definition</Label>
                <div className="flex items-center">
                  <p className="text-xs text-gray-500">Premium feature</p>
                  <Lock className="h-3 w-3 ml-1 text-yellow-500" />
                </div>
              </div>
              <Switch disabled />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm">Remove Background</Label>
                <div className="flex items-center">
                  <p className="text-xs text-gray-500">Premium feature</p>
                  <Lock className="h-3 w-3 ml-1 text-yellow-500" />
                </div>
              </div>
              <Switch disabled />
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6 space-y-4">
          <h3 className="font-semibold flex items-center">
            <Sparkles className="h-4 w-4 mr-2 text-yellow-500" />
            Premium Features
          </h3>
          <p className="text-sm text-gray-600">Upgrade to unlock premium features:</p>
          <ul className="text-sm space-y-2">
            <li className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-green-500" />
              High-resolution downloads
            </li>
            <li className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-green-500" />
              Background removal
            </li>
            <li className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-green-500" />
              Unlimited generations
            </li>
          </ul>
          <Button variant="outline" className="w-full">
            Upgrade to Premium
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
