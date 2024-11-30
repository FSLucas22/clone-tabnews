import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();

  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <Dependencies />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div>Ultima Atualização: {updatedAtText}</div>;
}

function Dependencies() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  if (isLoading && !data) {
    return "Dependências: Carregando...";
  }

  const { active_connections, max_connections, version } =
    data.dependencies.database;

  return (
    <div>
      Dependencias:
      <NewLine level="1" content="Banco de dados:" />
      <NewLine level="2" content={`Conexões ativas: ${active_connections}`} />
      <NewLine level="2" content={`Conexões máximas: ${max_connections}`} />
      <NewLine level="2" content={`Versão: ${version}`} />
    </div>
  );
}

function NewLine(propriedades) {
  const { level, content } = propriedades;
  const paddingLeftValue = 10 * level;

  const contentStyle = {
    paddingLeft: paddingLeftValue + "px",
  };

  return (
    <>
      <br />
      <span style={contentStyle}>{content}</span>
    </>
  );
}
