#include <iostream>

void show()
{
    int x{ 9 };
    std::cout << "show:" << x << '\n';
}

int main()
{
    int x{ 2 };
    std::cout << "main:" << x << '\n';

    show();

    std::cout << "main:" << x << '\n';
}
