<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html> 
<body>
  <h2> Fotomodele vesele 🥳🥳</h2>
<h3> Fotomodele: </h3>
  <table border="1">
    <tr bgcolor="#9acd32">
      <th style="text-align:left">Nume Fotomodel</th>
      <th style="text-align:left">Inaltime</th>
<th style="text-align:left">Greutate</th>
<th style="text-align:left">Culoare Par</th>
<th style="text-align:left">Sex</th>
<th style="text-align:left">Telefon</th>
<th style="text-align:left">Data nstertii</th>
    </tr>
    <xsl:for-each select="agentie/fotomodele/fotomodel">
    <tr>
      <td><xsl:value-of select="nume"/></td>
      <td><xsl:value-of select="inaltime"/></td>
<td><xsl:value-of select="greutate"/></td>
<td><xsl:value-of select="culoarePar"/></td>
<td><xsl:value-of select="sex"/></td>
<td><xsl:value-of select="telefon"/></td>
<td><xsl:value-of select="data-nasterii"/></td>


    </tr>
    </xsl:for-each>
  </table>
<h2>Evenimente: </h2>
  <table border="1">
    <tr bgcolor="#9acd32">
      <th style="text-align:left">Data</th>
<th style="text-align:left">Durata</th>
<th style="text-align:left">Denumire</th>
<th style="text-align:left">Descriere</th>
    </tr>
    <xsl:for-each select="agentie/evenimente/eveniment/detalii">
    <tr>
      <td><xsl:value-of select="data"/></td>
      <td><xsl:value-of select="durata"/></td>
<td><xsl:value-of select="denumire"/></td>
<td><xsl:value-of select="descriere"/></td>
    </tr>
    </xsl:for-each>
  </table>
</body>
</html>
</xsl:template>
</xsl:stylesheet>
