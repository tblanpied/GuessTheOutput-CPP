#include <iostream>

void show(int x)
{
    std::cout << "A\n";
    if (x < 0)
        return;
    std::cout << "B\n";
}

int main()
{
    show(-1);
    show(1);
}
