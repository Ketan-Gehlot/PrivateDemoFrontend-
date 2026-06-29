import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Save } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { portfolioApi } from "@/services/api";
import { useAuthStore } from "@/store/auth-store";
import { usePreferencesStore, type ThemeMode } from "@/store/preferences-store";

const settingsSchema = z.object({
  preferredCurrency: z.string().min(2),
  decimalPrecision: z.coerce.number().int().min(0).max(8),
  language: z.string().min(2)
});

type SettingsValues = z.infer<typeof settingsSchema>;

const SettingsPage = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const theme = usePreferencesStore((state) => state.theme);
  const setTheme = usePreferencesStore((state) => state.setTheme);
  const language = usePreferencesStore((state) => state.language);
  const setLanguage = usePreferencesStore((state) => state.setLanguage);
  const notifications = usePreferencesStore((state) => state.notifications);
  const setNotifications = usePreferencesStore((state) => state.setNotifications);

  const form = useForm<SettingsValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      preferredCurrency: user?.preferredCurrency ?? "inr",
      decimalPrecision: user?.decimalPrecision ?? 2,
      language
    }
  });

  useEffect(() => {
    form.reset({
      preferredCurrency: user?.preferredCurrency ?? "inr",
      decimalPrecision: user?.decimalPrecision ?? 2,
      language
    });
  }, [form, language, user?.decimalPrecision, user?.preferredCurrency]);

  const mutation = useMutation({
    mutationFn: portfolioApi.updateSettings,
    onSuccess: ({ user: updatedUser }) => {
      setUser(updatedUser);
      setLanguage(form.getValues("language"));
      toast.success("Settings saved");
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : "Unable to save settings")
  });

  return (
    <div className="max-w-3xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Preferences are persisted locally, while currency and precision are saved to the API.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-5"
            onSubmit={form.handleSubmit((values) =>
              mutation.mutate({
                preferredCurrency: values.preferredCurrency,
                decimalPrecision: values.decimalPrecision
              })
            )}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Currency</Label>
                <Select
                  value={form.watch("preferredCurrency")}
                  onValueChange={(value) => form.setValue("preferredCurrency", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inr">INR</SelectItem>
                    <SelectItem value="usd">USD</SelectItem>
                    <SelectItem value="eur">EUR</SelectItem>
                    <SelectItem value="gbp">GBP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="decimalPrecision">Decimal Precision</Label>
                <Input id="decimalPrecision" type="number" min={0} max={8} {...form.register("decimalPrecision")} />
              </div>
              <div className="space-y-2">
                <Label>Theme</Label>
                <Select value={theme} onValueChange={(value) => setTheme(value as ThemeMode)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system">System</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Language</Label>
                <Select value={form.watch("language")} onValueChange={(value) => form.setValue("language", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">Hindi</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-md border px-3 py-3">
              <div>
                <p className="text-sm font-medium">Notifications</p>
                <p className="text-xs text-muted-foreground">Receive portfolio and harvest opportunity alerts.</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>

            <Button type="submit" disabled={mutation.isPending}>
              <Save className="size-4" />
              Save Settings
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
