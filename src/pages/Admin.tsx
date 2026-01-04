import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Menu, TrendingUp, MousePointer, MessageCircle, DollarSign, Palette, Image, Video, Type } from "lucide-react";
import { toast } from "sonner";
import { defaultSiteConfig, loadSiteConfig, saveSiteConfig, SiteConfig } from "@/config/siteConfig";

const ADMIN_PASSWORD = "admin123"; // Altere para uma senha segura

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [panelConfig, setPanelConfig] = useState<SiteConfig>(() => loadSiteConfig());
  const [stats] = useState({
    visits: 820,
    clicksPlan: 260,
    clicksWhatsApp: 140,
    payments: 64,
    revenue: 6400,
  });

  const today = new Date().toLocaleDateString("pt-BR");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      toast.success("Autenticado com sucesso!");
    } else {
      toast.error("Senha incorreta");
    }
  };

  const handleSaveConfig = () => {
    saveSiteConfig(panelConfig);
    toast.success("Configurações do painel salvas!");
  };

  const handleResetConfig = () => {
    setPanelConfig(defaultSiteConfig);
    saveSiteConfig(defaultSiteConfig);
    toast.success("Configurações resetadas para o padrão.");
  };

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md space-y-6 p-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Painel Admin</h1>
            <p className="text-sm text-muted-foreground">Digite a senha para acessar</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background to-muted/30 p-3 md:p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="flex items-center justify-between gap-3 rounded-xl bg-card/60 px-3 py-2 shadow-sm md:gap-4 md:px-4 md:py-3">
          <div className="flex items-center gap-2 md:gap-3">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 md:h-9 md:w-9"
              onClick={() => setShowEditor(true)}
            >
              <Menu className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
            <div>
              <h1 className="text-base font-semibold tracking-tight md:text-xl">Painel financeiro</h1>
              <p className="text-[10px] text-muted-foreground md:text-xs">
                Faturamento e desempenho geral - {today}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3 text-xs md:h-9 md:px-4 md:text-sm"
            onClick={() => setAuthenticated(false)}
          >
            Sair
          </Button>
        </header>

        <section className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4 md:gap-4">
            <Card className="space-y-2 p-4 md:p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-2.5 md:p-3">
                  <TrendingUp className="h-4 w-4 text-primary md:h-5 md:w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground md:text-sm">Visitas</p>
                  <p className="text-xl font-bold md:text-2xl">{stats.visits}</p>
                </div>
              </div>
            </Card>

            <Card className="space-y-2 p-4 md:p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-2.5 md:p-3">
                  <MousePointer className="h-4 w-4 text-primary md:h-5 md:w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground md:text-sm">Cliques no plano</p>
                  <p className="text-xl font-bold md:text-2xl">{stats.clicksPlan}</p>
                </div>
              </div>
            </Card>

            <Card className="space-y-2 p-4 md:p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-emerald-500/10 p-2.5 md:p-3">
                  <MessageCircle className="h-4 w-4 text-emerald-500 md:h-5 md:w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground md:text-sm">Cliques no WhatsApp</p>
                  <p className="text-xl font-bold md:text-2xl">{stats.clicksWhatsApp}</p>
                </div>
              </div>
            </Card>

            <Card className="space-y-2 p-4 md:p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-yellow-500/10 p-2.5 md:p-3">
                  <DollarSign className="h-4 w-4 text-yellow-500 md:h-5 md:w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground md:text-sm">Vendas confirmadas</p>
                  <p className="text-xl font-bold md:text-2xl">{stats.payments}</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid gap-3 md:grid-cols-3 md:gap-4">
            <Card className="space-y-2 p-4 md:p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-2.5 md:p-3">
                  <DollarSign className="h-4 w-4 text-primary md:h-5 md:w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground md:text-sm">Faturamento de hoje</p>
                  <p className="text-xl font-bold md:text-2xl">
                    R$ {stats.revenue.toFixed(2).replace(".", ",")}
                  </p>
                  <p className="text-[10px] text-muted-foreground md:text-xs">Data de hoje: {today}</p>
                </div>
              </div>
            </Card>

            <Card className="space-y-2 p-4 md:p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-2.5 md:p-3">
                  <TrendingUp className="h-4 w-4 text-primary md:h-5 md:w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground md:text-sm">Ticket médio</p>
                  <p className="text-xl font-bold md:text-2xl">
                    R$
                    {" "}
                    {(stats.payments ? stats.revenue / stats.payments : 0)
                      .toFixed(2)
                      .replace(".", ",")}
                  </p>
                  <p className="text-[10px] text-muted-foreground md:text-xs">
                    Faturamento dividido pelo número de vendas
                  </p>
                </div>
              </div>
            </Card>

            <Card className="space-y-2 p-4 md:p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-2.5 md:p-3">
                  <TrendingUp className="h-4 w-4 text-primary md:h-5 md:w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground md:text-sm">Taxa de conversão</p>
                  <p className="text-xl font-bold md:text-2xl">
                    {(stats.visits ? (stats.payments / stats.visits) * 100 : 0)
                      .toFixed(1)
                      .replace(".", ",")}
                    %
                  </p>
                  <p className="text-[10px] text-muted-foreground md:text-xs">
                    Vendas sobre visitas totais
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </div>

      {showEditor && (
        <div className="fixed inset-0 z-40 flex">
          <div className="flex h-full w-80 max-w-full flex-col gap-4 border-r border-border bg-card p-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Menu className="h-4 w-4" />
                <span className="text-sm font-semibold">Editor do painel</span>
              </div>
              <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setShowEditor(false)}>
                <EyeOff className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto pr-1 text-xs">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  <Palette className="h-3 w-3" />
                  <span>Cores</span>
                </div>
                <Input
                  placeholder="Cor de fundo (ex: #000000)"
                  value={panelConfig.pageBackgroundColor}
                  onChange={(e) => setPanelConfig({ ...panelConfig, pageBackgroundColor: e.target.value })}
                />
                <Input
                  placeholder="Cor do botão principal (ex: #ff00ff)"
                  value={panelConfig.primaryButtonBgColor}
                  onChange={(e) =>
                    setPanelConfig({ ...panelConfig, primaryButtonBgColor: e.target.value })
                  }
                />
                <Input
                  placeholder="Cor do botão WhatsApp (ex: #25D366)"
                  value={panelConfig.whatsappButtonBgColor}
                  onChange={(e) =>
                    setPanelConfig({ ...panelConfig, whatsappButtonBgColor: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  <Type className="h-3 w-3" />
                  <span>Textos e botões</span>
                </div>
                <Input
                  placeholder="Nome do perfil"
                  value={panelConfig.profileName}
                  onChange={(e) => setPanelConfig({ ...panelConfig, profileName: e.target.value })}
                />
                <Input
                  placeholder="Subtítulo do perfil"
                  value={panelConfig.profileSubtitle}
                  onChange={(e) => setPanelConfig({ ...panelConfig, profileSubtitle: e.target.value })}
                />
                <Input
                  placeholder="Texto do botão principal"
                  value={panelConfig.primaryPlanLabel}
                  onChange={(e) => setPanelConfig({ ...panelConfig, primaryPlanLabel: e.target.value })}
                />
                <Input
                  placeholder="Preço exibido no botão principal"
                  value={panelConfig.primaryPlanPriceText}
                  onChange={(e) =>
                    setPanelConfig({ ...panelConfig, primaryPlanPriceText: e.target.value })
                  }
                />
                <Input
                  placeholder="Link do botão principal"
                  value={panelConfig.primaryPlanHref}
                  onChange={(e) => setPanelConfig({ ...panelConfig, primaryPlanHref: e.target.value })}
                />
                <Input
                  placeholder="Texto do botão WhatsApp"
                  value={panelConfig.whatsappButtonLabel}
                  onChange={(e) =>
                    setPanelConfig({ ...panelConfig, whatsappButtonLabel: e.target.value })
                  }
                />
                <Input
                  placeholder="Preço exibido no botão WhatsApp"
                  value={panelConfig.whatsappButtonPriceText}
                  onChange={(e) =>
                    setPanelConfig({ ...panelConfig, whatsappButtonPriceText: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  <Image className="h-3 w-3" />
                  <span>Fotos e banner</span>
                </div>
                <Input
                  placeholder="URL do banner principal"
                  value={panelConfig.heroBannerUrl}
                  onChange={(e) => setPanelConfig({ ...panelConfig, heroBannerUrl: e.target.value })}
                />
                <Input
                  placeholder="URL da foto de perfil"
                  value={panelConfig.profileImageUrl}
                  onChange={(e) => setPanelConfig({ ...panelConfig, profileImageUrl: e.target.value })}
                />
                <Input
                  placeholder="URL da foto de grid/feed"
                  value={panelConfig.gridImageUrl}
                  onChange={(e) => setPanelConfig({ ...panelConfig, gridImageUrl: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  <Video className="h-3 w-3" />
                  <span>Vídeos de prévia</span>
                </div>
                <Input
                  placeholder="URL do vídeo principal"
                  value={panelConfig.mainTeaserVideoUrl}
                  onChange={(e) =>
                    setPanelConfig({ ...panelConfig, mainTeaserVideoUrl: e.target.value })
                  }
                />
                <Input
                  placeholder="URL do segundo vídeo"
                  value={panelConfig.secondaryTeaserVideoUrl}
                  onChange={(e) =>
                    setPanelConfig({ ...panelConfig, secondaryTeaserVideoUrl: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  <TrendingUp className="h-3 w-3" />
                  <span>Métricas da capa</span>
                </div>
                <Input
                  placeholder="Número de posts"
                  value={panelConfig.heroPostsCount}
                  onChange={(e) => setPanelConfig({ ...panelConfig, heroPostsCount: e.target.value })}
                />
                <Input
                  placeholder="Número de likes"
                  value={panelConfig.heroLikesCount}
                  onChange={(e) => setPanelConfig({ ...panelConfig, heroLikesCount: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <Button className="flex-1 text-xs" size="sm" onClick={handleSaveConfig}>
                Salvar alterações
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={handleResetConfig}
              >
                Resetar
              </Button>
            </div>
          </div>
          <button
            type="button"
            className="flex-1 bg-background/40"
            onClick={() => setShowEditor(false)}
            aria-label="Fechar editor"
          />
        </div>
      )}
    </div>
  );
};

export default Admin;
