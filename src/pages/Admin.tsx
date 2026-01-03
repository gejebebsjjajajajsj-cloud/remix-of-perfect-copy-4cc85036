import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Eye,
  EyeOff,
  TrendingUp,
  MousePointer,
  MessageCircle,
  DollarSign,
  Menu,
} from "lucide-react";
import { toast } from "sonner";

const ADMIN_PASSWORD = "admin123"; // Change this to a secure password

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 p-3 md:p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="flex items-center justify-between gap-3 rounded-xl bg-card/60 px-3 py-2 shadow-sm md:gap-4 md:px-4 md:py-3">
          <div className="flex items-center gap-2 md:gap-3">
            <Button variant="outline" size="icon" className="h-8 w-8 md:h-9 md:w-9">
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
            <Card className="p-4 md:p-6 space-y-2">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-2.5 md:p-3">
                  <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground md:text-sm">Visitas</p>
                  <p className="text-xl font-bold md:text-2xl">{stats.visits}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 md:p-6 space-y-2">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-2.5 md:p-3">
                  <MousePointer className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground md:text-sm">Cliques no plano</p>
                  <p className="text-xl font-bold md:text-2xl">{stats.clicksPlan}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 md:p-6 space-y-2">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-emerald-500/10 p-2.5 md:p-3">
                  <MessageCircle className="h-4 w-4 md:h-5 md:w-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground md:text-sm">Cliques no WhatsApp</p>
                  <p className="text-xl font-bold md:text-2xl">{stats.clicksWhatsApp}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 md:p-6 space-y-2">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-yellow-500/10 p-2.5 md:p-3">
                  <DollarSign className="h-4 w-4 md:h-5 md:w-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground md:text-sm">Vendas confirmadas</p>
                  <p className="text-xl font-bold md:text-2xl">{stats.payments}</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid gap-3 md:grid-cols-3 md:gap-4">
            <Card className="p-4 md:p-6 space-y-2">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-2.5 md:p-3">
                  <DollarSign className="h-4 w-4 md:h-5 md:w-5 text-primary" />
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

            <Card className="p-4 md:p-6 space-y-2">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-2.5 md:p-3">
                  <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-primary" />
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

            <Card className="p-4 md:p-6 space-y-2">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-2.5 md:p-3">
                  <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-primary" />
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
    </div>
  );
};

export default Admin;
