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
        <div className="fixed inset-0 z-40 flex bg-background/60 backdrop-blur-sm">
          {/* Barra lateral simples com navegação */}
          <aside className="flex h-full w-60 flex-col border-r border-border bg-card/95">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Menu className="h-4 w-4" />
                <span>Menu admin</span>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7"
                onClick={() => setShowEditor(false)}
              >
                <EyeOff className="h-4 w-4" />
              </Button>
            </div>

            <nav className="flex-1 space-y-1 px-3 py-4 text-sm">
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-left text-primary shadow-sm transition hover:bg-primary/15"
              >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-primary/20">
                  <Palette className="h-3 w-3" />
                </span>
                <span>Configurações</span>
              </button>
            </nav>

            <div className="border-t border-border px-3 py-3 text-[11px] text-muted-foreground">
              <p>Painel de edição da página principal.</p>
            </div>
          </aside>

          {/* Área principal de configuração */}
          <section className="flex-1 overflow-y-auto bg-background px-3 py-4 md:px-6 md:py-6">
            <div className="mx-auto flex max-w-3xl flex-col gap-4">
              <header className="flex flex-col gap-1 border-b border-border/60 pb-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-base font-semibold tracking-tight md:text-lg">Configurações da página</h2>
                  <p className="text-xs text-muted-foreground">
                    Edite todas as informações que aparecem na página principal.
                  </p>
                </div>
                <div className="flex gap-2 pt-1 md:pt-0">
                  <Button className="text-xs" size="sm" onClick={handleSaveConfig}>
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
              </header>

              <div className="space-y-4 pb-4">
                {/* Cores */}
                <Card className="space-y-3 p-4">
                  <div className="flex items-center gap-2">
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <Palette className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold">Cores da página</h3>
                      <p className="text-xs text-muted-foreground">
                        Personalize o fundo da página e as cores dos botões principais.
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="space-y-1">
                      <p className="text-[11px] font-medium text-muted-foreground">Cor de fundo</p>
                      <Input
                        placeholder="Ex: #000000"
                        value={panelConfig.pageBackgroundColor}
                        onChange={(e) =>
                          setPanelConfig({ ...panelConfig, pageBackgroundColor: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-medium text-muted-foreground">Botão principal</p>
                      <Input
                        placeholder="Ex: #ff00ff"
                        value={panelConfig.primaryButtonBgColor}
                        onChange={(e) =>
                          setPanelConfig({ ...panelConfig, primaryButtonBgColor: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-medium text-muted-foreground">Botão WhatsApp</p>
                      <Input
                        placeholder="Ex: #25D366"
                        value={panelConfig.whatsappButtonBgColor}
                        onChange={(e) =>
                          setPanelConfig({ ...panelConfig, whatsappButtonBgColor: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </Card>

                {/* Textos e botões */}
                <Card className="space-y-3 p-4">
                  <div className="flex items-center gap-2">
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <Type className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold">Textos e botões</h3>
                      <p className="text-xs text-muted-foreground">
                        Nome, subtítulo do perfil e textos dos botões de ação.
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-1">
                      <p className="text-[11px] font-medium text-muted-foreground">Nome do perfil</p>
                      <Input
                        placeholder="Nome do perfil"
                        value={panelConfig.profileName}
                        onChange={(e) =>
                          setPanelConfig({ ...panelConfig, profileName: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-medium text-muted-foreground">Subtítulo</p>
                      <Input
                        placeholder="Subtítulo do perfil"
                        value={panelConfig.profileSubtitle}
                        onChange={(e) =>
                          setPanelConfig({ ...panelConfig, profileSubtitle: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-1">
                      <p className="text-[11px] font-medium text-muted-foreground">Texto botão principal</p>
                      <Input
                        placeholder="Ex: Assinar agora"
                        value={panelConfig.primaryPlanLabel}
                        onChange={(e) =>
                          setPanelConfig({ ...panelConfig, primaryPlanLabel: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-medium text-muted-foreground">Preço botão principal</p>
                      <Input
                        placeholder="Ex: R$ 29,90"
                        value={panelConfig.primaryPlanPriceText}
                        onChange={(e) =>
                          setPanelConfig({ ...panelConfig, primaryPlanPriceText: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-medium text-muted-foreground">Link botão principal</p>
                      <Input
                        placeholder="URL da página de pagamento"
                        value={panelConfig.primaryPlanHref}
                        onChange={(e) =>
                          setPanelConfig({ ...panelConfig, primaryPlanHref: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-medium text-muted-foreground">Texto botão WhatsApp</p>
                      <Input
                        placeholder="Ex: Chamar no WhatsApp"
                        value={panelConfig.whatsappButtonLabel}
                        onChange={(e) =>
                          setPanelConfig({ ...panelConfig, whatsappButtonLabel: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-medium text-muted-foreground">Preço botão WhatsApp</p>
                      <Input
                        placeholder="Ex: R$ 150,00"
                        value={panelConfig.whatsappButtonPriceText}
                        onChange={(e) =>
                          setPanelConfig({ ...panelConfig, whatsappButtonPriceText: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </Card>

                {/* Fotos e banner */}
                <Card className="space-y-3 p-4">
                  <div className="flex items-center gap-2">
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <Image className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold">Fotos e banner</h3>
                      <p className="text-xs text-muted-foreground">
                        Imagem de capa, foto de perfil e foto de grid/feed.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <p className="text-[11px] font-medium text-muted-foreground">Banner principal</p>
                      <Input
                        placeholder="URL do banner principal"
                        value={panelConfig.heroBannerUrl}
                        onChange={(e) =>
                          setPanelConfig({ ...panelConfig, heroBannerUrl: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="space-y-1">
                        <p className="text-[11px] font-medium text-muted-foreground">Foto de perfil</p>
                        <Input
                          placeholder="URL da foto de perfil"
                          value={panelConfig.profileImageUrl}
                          onChange={(e) =>
                            setPanelConfig({ ...panelConfig, profileImageUrl: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <p className="text-[11px] font-medium text-muted-foreground">Foto de grid/feed</p>
                        <Input
                          placeholder="URL da foto de grid/feed"
                          value={panelConfig.gridImageUrl}
                          onChange={(e) =>
                            setPanelConfig({ ...panelConfig, gridImageUrl: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Vídeos */}
                <Card className="space-y-3 p-4">
                  <div className="flex items-center gap-2">
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <Video className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold">Vídeos de prévia</h3>
                      <p className="text-xs text-muted-foreground">
                        URLs dos vídeos que aparecem na parte de baixo da página.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <p className="text-[11px] font-medium text-muted-foreground">Vídeo principal</p>
                      <Input
                        placeholder="URL do vídeo principal"
                        value={panelConfig.mainTeaserVideoUrl}
                        onChange={(e) =>
                          setPanelConfig({ ...panelConfig, mainTeaserVideoUrl: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-medium text-muted-foreground">Segundo vídeo</p>
                      <Input
                        placeholder="URL do segundo vídeo"
                        value={panelConfig.secondaryTeaserVideoUrl}
                        onChange={(e) =>
                          setPanelConfig({ ...panelConfig, secondaryTeaserVideoUrl: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </Card>

                {/* Métricas da capa */}
                <Card className="space-y-3 p-4">
                  <div className="flex items-center gap-2">
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <TrendingUp className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold">Métricas da capa</h3>
                      <p className="text-xs text-muted-foreground">
                        Números que aparecem em cima do banner (posts e likes).
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-1">
                      <p className="text-[11px] font-medium text-muted-foreground">Número de posts</p>
                      <Input
                        placeholder="Ex: 744"
                        value={panelConfig.heroPostsCount}
                        onChange={(e) =>
                          setPanelConfig({ ...panelConfig, heroPostsCount: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-medium text-muted-foreground">Número de likes</p>
                      <Input
                        placeholder="Ex: 370k"
                        value={panelConfig.heroLikesCount}
                        onChange={(e) =>
                          setPanelConfig({ ...panelConfig, heroLikesCount: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Admin;
