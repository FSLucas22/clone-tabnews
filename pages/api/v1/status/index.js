function status(request, response) {
  response.status(200).json({ chave: "isso é um teste grandão" });
}

export default status;
