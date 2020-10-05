@ECHO OFF
REM Source file.
SET "TextFile=waifus.csv"

REM Determine the number of lines.
FOR /f %%a IN ('type "%textfile%"^|find /c /v ""') DO SET /a numlines=%%a

REM Pick a random line.
SET /A RandomLine=(%RANDOM% %% %NumLines%)

REM Prevent skipping all the lines.
IF "%RandomLine%"=="0" (SET "RandomLine=") ELSE (SET "RandomLine=skip=%randomline%")

REM Print the random line.
FOR /F "usebackq tokens=* %RandomLine% delims=" %%A IN (`TYPE %TextFile%`) DO (
    ECHO %%A
    REM We are done. Stop the script.
    GOTO Finish
)

:Finish
ENDLOCAL
PAUSE