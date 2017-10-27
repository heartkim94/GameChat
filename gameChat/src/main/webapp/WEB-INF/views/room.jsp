<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<title>Home</title>
	<style>
 		.room td{
 			border: 1px solid black;
 		}
 		display {
 			display: block;
 			position: relative;
 			width: 640px;
 			height: 480px;
 			background: #ccc;
 		}
 		GameTag {
 			display: block;
 			position: absolute;
 		}
	</style>
	<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
	<script src="resources/js/gameCore.js"></script>
</head>
<body>

<room>
	<table class="room">
		<tr>
			<td>
				<display></display>
			</td>
			<td>
				<chatLog>채팅 로그</chatLog>
				<button onclick="test()">클릭</button>
			</td>
		</tr>
	</table>
</room>
</body>
</html>
