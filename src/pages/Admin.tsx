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
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="flex items-center justify-between gap-4 rounded-xl bg-card/60 px-4 py-3 shadow-sm">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold tracking-tight">Painel financeiro</h1>
              <p className="text-xs text-muted-foreground">
                Resumo consolidado de vendas, visitas e desempenho
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={() => setAuthenticated(false)}>
            Sair
          </Button>
        </header>

        <section className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="p-6 space-y-2">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-3">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Visitas</p>
                  <p className="text-2xl font-bold">{stats.visits}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 space-y-2">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-3">
                  <MousePointer className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Cliques no plano</p>
                  <p className="text-2xl font-bold">{stats.clicksPlan}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 space-y-2">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-emerald-500/10 p-3">
                  <MessageCircle className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Cliques no WhatsApp</p>
                  <p className="text-2xl font-bold">{stats.clicksWhatsApp}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 space-y-2">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-yellow-500/10 p-3">
                  <DollarSign className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Vendas confirmadas</p>
                  <p className="text-2xl font-bold">{stats.payments}</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="p-6 space-y-2">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-3">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Faturamento total</p>
                  <p className="text-2xl font-bold">
                    R$ {stats.revenue.toFixed(2).replace(".", ",")}
                  </p>
                  <p className="text-xs text-muted-foreground">Somatório de todas as vendas registradas</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 space-y-2">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-3">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ticket médio</p>
                  <p className="text-2xl font-bold">
                    R$
                    {" "}
                    {(stats.payments ? stats.revenue / stats.payments : 0)
                      .toFixed(2)
                      .replace(".", ",")}
                  </p>
                  <p className="text-xs text-muted-foreground">Faturamento dividido pelo número de vendas</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 space-y-2">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-3">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Taxa de conversão</p>
                  <p className="text-2xl font-bold">
                    {(stats.visits ? (stats.payments / stats.visits) * 100 : 0)
                      .toFixed(1)
                      .replace(".", ",")}
                    %
                  </p>
                  <p className="text-xs text-muted-foreground">Vendas sobre visitas totais</p>
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
